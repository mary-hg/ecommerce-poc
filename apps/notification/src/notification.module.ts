import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}
