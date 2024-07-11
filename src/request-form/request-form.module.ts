import { Module } from '@nestjs/common';
import { RequestFormController } from './request-form.controller';
import { RequestFormService } from './request-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestForm } from './request-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestForm])],
  controllers: [RequestFormController],
  providers: [RequestFormService],
})
export class RequestFormModule {}
