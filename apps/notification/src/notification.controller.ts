import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('order_created')
  sendOrderCreatedNotification(data: unknown) {
    console.log({ data });
    //notification logic
  }
}
