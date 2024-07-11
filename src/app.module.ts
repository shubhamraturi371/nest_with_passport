import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FundraisersService } from './fundraisers/fundraisers.service';
import { FundraisersModule } from './fundraisers/fundraisers.module';
import { RequestFormModule } from './request-form/request-form.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development
    }),
    FundraisersModule,
    RequestFormModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FundraisersService],
})
export class AppModule {}
