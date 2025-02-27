import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryColumn()
  id: string;
  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  order: OrderEntity;
  @Column()
  productId: string;
  @Column()
  quantity: number;
}
