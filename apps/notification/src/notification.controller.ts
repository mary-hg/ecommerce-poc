import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor() {}

  @EventPattern('order_created')
  sendOrderCreatedNotification(data: unknown) {
    console.log({ data });
    //notification logic
  }
}
