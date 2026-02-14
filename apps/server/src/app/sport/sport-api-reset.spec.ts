import { NestApplication, NestFactory } from '@nestjs/core';
import { agent as request } from 'supertest';

import { AppModule } from '../app.module';

describe('The soccer API', () => {
  let app: NestApplication;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.listen(3535);
  });

  it('resets', async () => {
    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(5));

    await request(app.getHttpServer())
      .delete('/soccer/players/abcdef')
      .expect(200);

    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(4));

    await request(app.getHttpServer())
      .post('/soccer/reset')
      .expect(200);

    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(5));
  });

  it('removes E2E additions', async () => {
    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(5));

    await request(app.getHttpServer())
      .post('/soccer/players')
      .send({
        id: '111',
        name: 'e2e-Test Person'
      })
      .expect(201);

    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(6));

    await request(app.getHttpServer())
      .post('/soccer/remove-e2e')
      .expect(200);

    await request(app.getHttpServer())
      .get('/soccer/players')
      .expect(200)
      .expect(response => expect(response.body.length).toBe(5));
  });

  afterAll(async () => {
    await app.close();
  });
});
