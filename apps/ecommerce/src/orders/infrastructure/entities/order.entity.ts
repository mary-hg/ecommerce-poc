import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity()
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;
  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
  })
  items: OrderItemEntity[];
}
