import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../../domain/repository/order.repository';
import { OrderFactory } from '../../../domain/order.factory';
import { OrderItem } from '../../../domain/order-item';
import { OrderItemRepository } from '../../../domain/repository/order-item.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly orderFactory: OrderFactory,
  ) {}

  async execute(command: CreateOrderCommand) {
    const itemsToAdd: OrderItem[] = [];

    command.items.forEach((item) => {
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
      customerId: command.customerId,
      items: itemsToAdd,
    };
    const order = this.orderFactory.create(orderProps);
    await this.orderRepository.save(order);
    return order;
  }
}
