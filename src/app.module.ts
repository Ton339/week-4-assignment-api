import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // กำหนดให้ดึงค่าจาก .env มาใช้ได้ทั่วทั้งโปรเจกต์
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      // หากรันใน Docker จะใช้ค่าจาก docker-compose แต่ถ้ารันแบบปกติจะใช้ localhost
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // รองรับทั้งชื่อตัวแปร POSTGRES_DB และ เพื่อป้องกันหาค่าไม่เจอ
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      // ปิด synchronize อัตโนมัติเมื่ออยู่บน Production เพื่อป้องกันฐานข้อมูลพัง
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TaskModule,
    UserModule,
  ],
  controllers: [AppController], //
  providers: [AppService], //
})
export class AppModule {}
