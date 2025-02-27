import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderRepository } from './repository/order.repository';
import { CommandHandlers } from './command/handlers';
import { EventHandlers } from './events/handlers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
  providers: [OrderRepository, ...CommandHandlers, ...EventHandlers],
})
export class OrdersModule {}
