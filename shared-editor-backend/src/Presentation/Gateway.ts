import { Inject, Logger, NotFoundException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { DocumentsBusiness } from '../Business/DocumentsBusiness';
import { Transaction, Selection } from 'prosemirror-state';

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
  //
  // @SubscribeMessage('save_document')
  // async saveDocument(
  //   @MessageBody('id') id: number,
  //   @MessageBody('transaction') transaction: Transaction,
  //   @MessageBody('selection') selection: Selection,
  //   @MessageBody('version') version: number,
  // ) {
  //   Logger.log('[PRESENTATION] Received Save request');
  //
  //   console.log(JSON.stringify(transaction));
  //   Logger.log(`[PRESENTATION] Received Save request with ${selection}`);
  //   console.log(selection);
  //
  //   const response = await this.business.saveChanges(
  //     id,
  //     transaction as any,
  //     selection as any,
  //     version,
  //   );
  // }

  @SubscribeMessage('save_document')
  async saveDocument(
    @MessageBody('id') id: number,
    @MessageBody('newState') newState: JSON,
    @MessageBody('steps') steps: JSON[],
    @MessageBody('version') version: number,
  ) {
    Logger.log('[PRESENTATION] Received Save request');

    const response = await this.business.saveChanges(
      id,
      newState,
      steps,
      version,
    );
  }
}
