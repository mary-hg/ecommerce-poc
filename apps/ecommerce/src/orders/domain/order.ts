import { AggregateRoot } from '@nestjs/cqrs';

import { OrderItem } from './order-item';

export type OrderProperties = Readonly<{
  id: string;
  customerId: string;
  items: OrderItem[];
}>;

export class Order extends AggregateRoot {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(properties: OrderProperties) {
    super();
    Object.assign(this, properties);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get customerId(): string {
    return this._customerId;
  }

  set customerId(value: string) {
    this._customerId = value;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set items(value: OrderItem[]) {
    this._items = value;
  }
}
