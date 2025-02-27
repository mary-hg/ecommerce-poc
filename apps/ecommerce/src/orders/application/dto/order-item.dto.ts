import { IsNumber, IsPositive, IsString } from 'class-validator';

export class OrderItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
