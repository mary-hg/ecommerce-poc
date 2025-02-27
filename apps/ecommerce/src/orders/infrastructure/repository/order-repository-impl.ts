import { OrderRepository } from '../../domain/repository/order.repository';

import { v4 as uuidv4 } from 'uuid';
import { Order, OrderProperties } from '../../domain/order';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private repo: Repository<OrderEntity>,
  ) {}

  newId(): string {
    return uuidv4();
  }

  async save(order: Order): Promise<void> {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.id;
    orderEntity.customerId = order.customerId;

    const itemsToAdd: OrderItemEntity[] = [];
    order.items.forEach((item) => {
      const itemToAdd = new OrderItemEntity();
      itemToAdd.id = item.id;
      itemToAdd.productId = item.productId;
      itemToAdd.quantity = item.quantity;
      itemsToAdd.push(itemToAdd);
    });
    orderEntity.items = itemsToAdd;
    await this.repo.save(orderEntity);
  }

  private modelToEntity(model: Order): OrderEntity {
    const properties = JSON.parse(JSON.stringify(model)) as OrderProperties;
    return Object.assign(new OrderEntity(), {
      ...properties,
    });
  }
}
