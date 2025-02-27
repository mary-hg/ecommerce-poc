import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
        .post('/orders')
        .set('Authorization', 'Bearer valid-token')
        .send();

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('customer_id must be a string');
      expect(response.body.message).toContain('items should not be empty');
      expect(response.body.message).toContain('items must be an array');
    });

    it('should return 400 when missing customer id', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          items: [{ product_id: '98765', quantity: 2 }],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('customer_id must be a string');
    });

    it('should return 400 when missing items', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customer_id: '12345',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('items must be an array');
    });

    it('should return 400 when empty items', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customer_id: '12345',
          items: [],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('items should not be empty');
    });

    it('should create an order successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', 'Bearer valid-token')
        .send({
          customer_id: '12345',
          items: [
            { product_id: '98765', quantity: 2 },
            { product_id: '54321', quantity: 1 },
          ],
        });

      expect(response.status).toBe(201);
    });
  });
  // it('should return 401 if authorization is missing', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/orders')
  //     .send({
  //       customer_id: '12345',
  //       items: [{ product_id: '98765', quantity: 2 }],
  //       payment_method: 'credit_card',
  //       shipping_address: {
  //         street: '123 Main St',
  //         city: 'Madrid',
  //         postal_code: '28001',
  //         country: 'Spain',
  //       },
  //     });
  //
  //   expect(response.status).toBe(401);
  //   expect(response.body).toHaveProperty('message', 'Unauthorized');
  // });
});
