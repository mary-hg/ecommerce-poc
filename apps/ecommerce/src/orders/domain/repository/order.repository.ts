import { Order } from '../order';

export interface OrderRepositoryInterface {
  newId: () => string;
  save: (order: Order) => Promise<void>;
}

export abstract class OrderRepository implements OrderRepositoryInterface {
  abstract newId(): string;

  abstract save(order: Order): Promise<void>;
}
