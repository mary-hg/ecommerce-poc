import { IsNumber, IsPositive, IsString } from 'class-validator';

export class OrderItemDto {
  @IsString()
  product_id: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
