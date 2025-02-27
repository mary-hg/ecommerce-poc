export class CreateOrderCommand {
  constructor(
    public readonly customer_id: string,
    public readonly items: Array<{ product_id: string; quantity: number }>,
  ) {}
}
