import { AggregateRoot } from '@nestjs/cqrs';

export type OrderItemProperties = Readonly<{
  id: string;
  productId: string;
  quantity: number;
}>;

export class OrderItem extends AggregateRoot {
  private _id: string;
  private _productId: string;
  private _quantity: number;

  constructor(properties: OrderItemProperties) {
    super();
    Object.assign(this, properties);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get productId(): string {
    return this._productId;
  }

  set productId(value: string) {
    this._productId = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
