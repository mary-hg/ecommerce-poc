import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Order, OrderProperties } from './order';
import { OrderCreatedEvent } from '../application/events/impl/order-created.event';

export class OrderFactory {
  @Inject() private readonly eventPublisher: EventPublisher;

  create(options: OrderProperties): Order {
    const order = this.eventPublisher.mergeObjectContext(
      new Order({ ...options }),
    );
    order.apply(new OrderCreatedEvent(order.id));
    order.commit();
    return order;
  }
}
