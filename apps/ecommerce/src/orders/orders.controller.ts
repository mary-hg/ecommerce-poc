import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './application/command/impl/create-order.command';
import { CreateOrderDto } from './application/dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(
      new CreateOrderCommand(createOrderDto.customerId, createOrderDto.items),
    );
  }
}
