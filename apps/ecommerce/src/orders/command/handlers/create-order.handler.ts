import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { Order } from '../../models/order.model';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    const { customer_id, items } = command;
    const OrderModel = this.publisher.mergeClassContext(Order);
    const order = new OrderModel();
    order.create(customer_id, items);
    await this.repository.persist(order);
    order.commit();
    return order;
  }
}
