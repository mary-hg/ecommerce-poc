import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../command/impl/create-order.command';
import { CreateOrderDto } from './dto/request/create-order.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from '../../domain/order';
import { OrderItemDto } from './dto/response/order-item.dto';
import { OrderItem } from '../../domain/order-item';
import { OrderDto } from './dto/response/order.dto';

@ApiBearerAuth()
@ApiTags('orders')
@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Customer not found. To be implemented.Product not found. To be implemented',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized. To be implemented.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: OrderDto,
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const order: Order = await this.commandBus.execute(
      new CreateOrderCommand(createOrderDto.customerId, createOrderDto.items),
    );
    const items: OrderItemDto[] = [];
    order.items.forEach((item: OrderItem) => {
      const itemDto = new OrderItemDto();
      itemDto.id = item.id;
      itemDto.quantity = item.quantity;
      itemDto.productId = item.productId;
      items.push(itemDto);
    });
    const orderDTO = new OrderDto();
    orderDTO.id = order.id;
    orderDTO.customerId = order.customerId;
    orderDTO.items = items;
    return orderDTO;
  }
}
