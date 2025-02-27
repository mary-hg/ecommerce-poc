import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderRepository } from './repository/order.repository';
import { CommandHandlers } from './command/handlers';
import { EventHandlers } from './events/handlers';
import { CreateOrderDto } from './dto/create-order.dto';

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [
    OrderRepository,
    ...CommandHandlers,
    ...EventHandlers
  ],
})
export class OrdersModule {}
