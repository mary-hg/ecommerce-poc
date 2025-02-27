import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { order } from './fixtures/order';

@Injectable()
export class OrderRepository {
  async findOneById(id: number): Promise<Order> {
    return order;
  }

  async findAll(): Promise<Order[]> {
    return [order];
  }
}
