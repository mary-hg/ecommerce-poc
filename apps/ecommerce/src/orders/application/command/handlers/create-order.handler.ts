import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../../domain/repository/order.repository';
import { OrderFactory } from '../../../domain/order.factory';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderFactory: OrderFactory,
  ) {}

  async execute(command: CreateOrderCommand) {
    const order = this.orderFactory.create(command.customerId, command.items);
    await this.orderRepository.save(order);

    return order;
  }
}
