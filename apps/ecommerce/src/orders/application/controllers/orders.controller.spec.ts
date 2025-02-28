import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/post order', () => {
    it('empty body should throw error', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/orders')
        .set('Authorization', 'Bearer valid-token')
        .send();

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('customerId must be a string');
      expect(response.body.message).toContain('items should not be empty');
      expect(response.body.message).toContain('items must be an array');
    });

    it('should return 400 when missing customer id', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          items: [{ productId: '98765', quantity: 2 }],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('customerId must be a string');
    });

    it('should return 400 when missing items', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customerId: '12345',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('items must be an array');
    });

    it('should return 400 when empty items', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customerId: '12345',
          items: [],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('items should not be empty');
    });

    it('should create an order successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customerId: '12345',
          items: [
            { productId: '98765', quantity: 2 },
            { productId: '54321', quantity: 1 },
          ],
        });

      expect(response.status).toBe(201);
    });
  });
});
