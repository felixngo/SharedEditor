import { Inject, Injectable, Logger } from '@nestjs/common';
import { DocumentsRepository } from '../DataAccess/Repositories/DocumentsRepository';
import { DocumentsDto } from '../Models/Dto/documentsDto';

@Injectable()
export class DocumentsBusiness {
  repository: DocumentsRepository;

  constructor(@Inject(DocumentsRepository) repository) {
    this.repository = repository;
  }

  async createDocument(title: string): Promise<DocumentsDto> {
    return await this.repository.create(
      new DocumentsDto(0, title, {} as JSON, new Date(), new Date()),
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
