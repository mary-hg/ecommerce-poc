import { EventPublisher } from '@nestjs/cqrs';
import { Order } from './order';
import { OrderCreatedEvent } from '../application/events/impl/order-created.event';
import { OrderItem } from './order-item';
import { OrderRepository } from './repository/order.repository';
import { OrderItemRepository } from './repository/order-item.repository';
import { Inject } from '@nestjs/common';

export class OrderFactory {
  @Inject() private readonly orderRepository: OrderRepository;
  @Inject() private readonly orderItemRepository: OrderItemRepository;
  @Inject() private readonly eventPublisher: EventPublisher;

  create(
    customerId: string,
    items: Array<{ productId: string; quantity: number }>,
  ): Order {
    const itemsToAdd: OrderItem[] = [];
    items.forEach((item) => {
      itemsToAdd.push(
        new OrderItem({
          id: this.orderItemRepository.newId(),
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
    });
    const orderProps = {
      id: this.orderRepository.newId(),
      customerId: customerId,
      items: itemsToAdd,
    };

    const order = this.eventPublisher.mergeObjectContext(
      new Order({ ...orderProps }),
    );
    order.apply(new OrderCreatedEvent(order.id));
    order.commit();
    return order;
  }
}
