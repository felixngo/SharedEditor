import { Body, Controller, Get, Inject, Logger, Param, Post } from "@nestjs/common";
import { DocumentsDto } from '../../Models/Dto/documentsDto';
import { DocumentsBusiness } from '../../Business/DocumentsBusiness';

@Controller('api')
export class DocumentController {
  business: DocumentsBusiness;

  constructor(@Inject(DocumentsBusiness) business) {
    this.business = business;
  }

  @Post('/document')
  async createDocument(@Body('title') title: string): Promise<DocumentsDto> {
    Logger.log(`[Controller] Creating document with title ${title}`);
    return await this.business.createDocument(title);
  }

  @Get('/documents')
  async getAllDocuments(): Promise<DocumentsDto[]> {
    Logger.log(`[Controller] Getting all documents`);
    const response = await this.business.getAllDocuments();
    Logger.log(`[Controller] Returning ${response.length} documents`);
    return response;
  }

  @Get('/document/:id')
  async getDocument(@Param('id') id: number): Promise<DocumentsDto> {
    Logger.log(`[Controller] Getting document with id ${id}`);
    return await this.business.getDocument(id);
  }
}
