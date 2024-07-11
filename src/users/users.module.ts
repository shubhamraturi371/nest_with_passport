import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { Role } from '../enums/roles.enum';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
  roles: Role[];
}
