import { Module } from '@nestjs/common';
import { FundraisersController } from './fundraisers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundraisers } from './fundraisers.entity';
import { FundraisersService } from './fundraisers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fundraisers])],
  providers: [FundraisersService],
  controllers: [FundraisersController],
  exports: [FundraisersService, TypeOrmModule],
})
export class FundraisersModule {}
