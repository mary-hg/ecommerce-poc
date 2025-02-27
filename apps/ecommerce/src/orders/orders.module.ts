import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './application/command/handlers';
import { EventHandlers } from './events/handlers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { OrderRepositoryImpl } from './infrastructure/repository/order-repository-impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './domain/repository/order.repository';
import { OrderItemRepository } from './domain/repository/order-item.repository';
import { OrderFactory } from './domain/order.factory';
import { OrderEntity } from './infrastructure/entities/order.entity';
import { OrderItemEntity } from './infrastructure/entities/order-item.entity';

const infrastructure = [
  {
    provide: OrderRepository,
    useClass: OrderRepositoryImpl,
  },
  {
    provide: OrderItemRepository,
    useClass: OrderRepositoryImpl,
  },
];
const entities = [OrderEntity, OrderItemEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [...entities],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    CqrsModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
          password: process.env.REDIS_PASSWORD,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    ...infrastructure,
    OrderFactory,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class OrdersModule {}
