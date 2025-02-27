import { AggregateRoot } from '@nestjs/cqrs';

import { v4 as uuidv4 } from 'uuid';

import { OrderItemDto } from '../dto/order-item.dto';

export class OrderItem extends AggregateRoot {
  private id: string;
  private product_id: string;
  private quantity: number;

  constructor() {
    super();
    this.id = uuidv4();
  }

  create(dto: OrderItemDto) {
    this.product_id = dto.product_id;
    this.quantity = dto.quantity;
  }
}
