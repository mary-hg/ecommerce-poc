import { OrderItem } from '../order-item';

export interface OrderItemRepositoryInterface {
  newId: () => string;
  save: (item: OrderItem) => Promise<void>;
}

export abstract class OrderItemRepository
  implements OrderItemRepositoryInterface
{
  abstract newId(): string;

  abstract save(item: OrderItem): Promise<void>;
}
