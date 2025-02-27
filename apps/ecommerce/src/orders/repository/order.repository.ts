import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';

@Injectable()
export class OrderRepository {
  async persist(order: Order): Promise<Order> {
    return order;
  }
}
