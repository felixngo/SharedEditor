import { Inject, Injectable, Logger } from '@nestjs/common';
import { DocumentsRepository } from '../DataAccess/Repositories/DocumentsRepository';
import { DocumentsDto } from '../Models/Dto/documentsDto';
import { exampleSetup } from 'prosemirror-example-setup';
import { EditorState } from 'prosemirror-state';
import { Schema, DOMParser } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-schema-basic';

@Injectable()
export class DocumentsBusiness {
  repository: DocumentsRepository;
  schema: Schema;

  constructor(@Inject(DocumentsRepository) repository) {
    this.repository = repository;
    this.schema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });
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

    const dto = new DocumentsDto(id, '', content, new Date(), new Date());
    return await this.repository.update(dto);
  }
}
