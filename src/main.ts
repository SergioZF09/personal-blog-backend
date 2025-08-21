import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Personal Blog')
    .setDescription('This is the documentation about API Personal Blog')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token'
    })
    .addSecurityRequirements('bearer')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, documentFactory);

  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.useGlobalGuards(jwtAuthGuard);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
