import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../events/impl/order-created.event';

export class Order extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  create() {
    this.apply(new OrderCreatedEvent(this.id));
  }
}
