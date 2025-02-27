import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { v4 as uuidv4 } from 'uuid';

import { OrderItem } from './order-item.model';

export class Order extends AggregateRoot {
  private id: string;
  private customer_id: string;
  private items: OrderItem[];

  constructor() {
    super();
    this.id = uuidv4();
  }

  create(
    customer_id: string,
    items: Array<{ product_id: string; quantity: number }>,
  ) {
    this.customer_id = customer_id;
    const itemsToAdd: OrderItem[] = [];
    items.forEach(function (value) {
      const item = new OrderItem();
      item.create(value);
      itemsToAdd.push(item);
    });
    this.items = itemsToAdd;
    this.apply(new OrderCreatedEvent(this.id));
  }
}
