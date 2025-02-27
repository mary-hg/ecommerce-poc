import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OrderCreatedEvent } from '../impl/order-created.event';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly _notificationClient: ClientProxy,
  ) {}

  handle(event: OrderCreatedEvent) {
    this._notificationClient.emit('order_created', event);
  }
}
