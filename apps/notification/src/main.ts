import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
    },
  );

  await app.listen();
}

bootstrap();
