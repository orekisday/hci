import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
dotenv.config();
const timeout = require('connect-timeout');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  const PORT = process.env.PORT || 8080;
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      headers: true,
    }),
  );
  app.use(timeout('50s'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Reject request with unexpected fields
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('GikAI')
    .setDescription('API documentation for project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    Logger.log(`App is running on url ${process.env.BASE_URL}`),
  );
}
bootstrap();
