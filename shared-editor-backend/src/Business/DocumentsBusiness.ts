import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { DocumentsRepository } from '../DataAccess/Repositories/DocumentsRepository';
import { DocumentsDto } from '../Models/Dto/documentsDto';
import { EditorState, Transaction } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-schema-basic';
import { Step } from 'prosemirror-transform';
import { Socket } from 'socket.io';

@Injectable()
export class DocumentsBusiness {
  repository: DocumentsRepository;
  schema: Schema;
  debounceDuration: number;
  lastState: EditorState | null;
  timeout: NodeJS.Timeout | null;

  constructor(@Inject(DocumentsRepository) repository) {
    this.repository = repository;
    this.schema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });
    this.debounceDuration = 10000;
  }

  async createDocument(title: string): Promise<DocumentsDto> {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    };
    return await this.repository.create(
      new DocumentsDto(
        undefined,
        title,
        content as any,
        new Date(),
        new Date(),
        1,
      ),
    );
  }

  async getDocument(id: number): Promise<DocumentsDto> {
    return await this.repository.getById(id);
  }

  async deleteDocument(id: number): Promise<void> {
    return await this.repository.delete(id);
  }

  async getAllDocuments(): Promise<DocumentsDto[]> {
    Logger.log(`[Business] Getting all documents`);
    return await this.repository.get();
  }

  async updateDocument(id: number, content: JSON): Promise<DocumentsDto> {
    Logger.log(
      `[Business] Updating document with id ${id} and content ${content}`,
    );

    const dto = new DocumentsDto(id, '', content, new Date(), new Date(), 1);
    return await this.repository.update(dto);
  }

  async saveChanges(
    socket: Socket,
    id: number,
    newState: JSON,
    steps: JSON[],
    version: number,
  ) {
    Logger.log(`[Business] Saving changes for document with id ${id}`);

    const document = await this.repository.getById(id);

    // if (Number(document.version) !== version) {
    //   Logger.error(
    //     `[Business] Document has been modified by another user ${document.version} : ${version}`,
    //   );
    //   throw new ConflictException('Document has been modified by another user');
    // }

    if (!this.lastState) {
      this.lastState = EditorState.create({
        doc: schema.nodeFromJSON(document.content),
        plugins: [],
      });
    }

    try {
      const receivedState = EditorState.create({
        doc: schema.nodeFromJSON(newState),
        plugins: [],
      });

      const newTransaction = receivedState.tr;
      newTransaction.doc = this.lastState.doc;

      steps.forEach((step) => newTransaction.step(Step.fromJSON(schema, step)));
      this.lastState = this.lastState.apply(newTransaction);

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(async () => {
        document.version = Number(version) + 1;
        document.content = this.lastState.doc.toJSON();
        document.updated_at = new Date();

        const newDoc = await this.repository.update(document);
        socket.broadcast.emit('document_updated', newDoc);
      }, this.debounceDuration);

      Logger.log(
        `[Business] New state version : ${document.version} : ${document.version + 1}}`,
      );
    } catch (error) {
      Logger.error(
        '[Business] An error occurred while saving changes ' + error,
      );
      throw error;
    }
  }
}
