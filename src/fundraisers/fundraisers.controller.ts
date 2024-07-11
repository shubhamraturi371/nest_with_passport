import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/roles.enum';
import { FundraisersService } from './fundraisers.service';
import { User } from '../users/users.service';

@Controller('fundraisers')
@ApiTags('Fundraiser Management')
export class FundraisersController {
  constructor(private fundraiserService: FundraisersService) {}
  @UseGuards(AuthGuard)
  @Get('')
  @ApiBearerAuth('Authorization')
  @Roles(Role.Admin, Role.Super_admin)
  async index(@Request() req: User) {
    const user = req.user;
    return await this.fundraiserService.getAccountsList(user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  @ApiBearerAuth('Authorization')
  @Roles(Role.Admin, Role.Super_admin)
  async store(@Request() req: User) {}
}
