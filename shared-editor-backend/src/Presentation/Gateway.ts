import { Inject, Logger, NotFoundException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { DocumentsBusiness } from '../Business/DocumentsBusiness';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway {
  @WebSocketServer()
  server: Server;
  business: DocumentsBusiness;

  constructor(@Inject(DocumentsBusiness) repository) {
    this.business = repository;
  }

  @SubscribeMessage('update_document')
  async update(
    @MessageBody('id') id: number,
    @MessageBody('content') content: JSON,
  ): Promise<void> {
    Logger.log(`Updating document with id ${id} and content ${content}`);
    try {
      await this.business.updateDocument(id, content);
    } catch (e) {
      if (typeof e === typeof NotFoundException) {
        Logger.error(`Document with id ${id} not found`);
      } else {
        Logger.error(`An error occurred while updating document with id ${id}`);
      }
      throw e;
    }
  }
}
