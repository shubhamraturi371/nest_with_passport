import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    MulterModule.register(multerConfig),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
