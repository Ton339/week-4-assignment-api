import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // เปลี่ยนบรรทัดที่ 13
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // ช่วยในการแปลง Type อัตโนมัติได้ดีขึ้น
      },
    }),
  );

  const prefix = 'api';
  app.setGlobalPrefix(prefix);
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on port: ${process.env.PORT}`);
  console.log(`Server URL: /${prefix}`);
}
bootstrap();
