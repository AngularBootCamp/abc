import { join } from 'path';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { static as serveStaticFiles } from 'express';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Fix for static files not being hosted properly by json-server in built nestjs app with Nx >=v15...
  if (environment.production) {
    app.use(
      '/',
      serveStaticFiles(
        join(__dirname, 'node_modules/json-server/public')
      )
    );

    app.use(
      '/soccer',
      serveStaticFiles(
        join(__dirname, 'node_modules/json-server/public')
      )
    );
  }

  const port = process.env.PORT || 8085;
  await app.listen(port);
  Logger.log(`Nest Application is running on port: ${port}`);
}

bootstrap();
