import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderRepository } from '../../repository/order.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    const { orderId } = command;
    const order = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+orderId),
    );
    order.create();
    order.commit();
  }
}
