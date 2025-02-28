import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  id: string;
  customerId: string;
  items: OrderItemDto[];
}
