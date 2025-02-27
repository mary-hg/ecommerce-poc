import { v4 as uuidv4 } from 'uuid';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderItem, OrderItemProperties } from '../../domain/order-item';
import { OrderItemRepository } from '../../domain/repository/order-item.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class OrderItemRepositoryImpl implements OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repo: Repository<OrderItemEntity>,
  ) {}

  newId(): string {
    return uuidv4();
  }

  async save(orderItem: OrderItem): Promise<void> {
    const item = new OrderItemEntity();
    item.id = orderItem.id;
    item.productId = orderItem.productId;
    item.quantity = orderItem.quantity;
    await this.repo.save(item);
  }

  private modelToEntity(model: OrderItem): OrderItemEntity {
    const properties = JSON.parse(JSON.stringify(model)) as OrderItemProperties;
    return Object.assign(new OrderItemEntity(), {
      ...properties,
    });
  }
}
