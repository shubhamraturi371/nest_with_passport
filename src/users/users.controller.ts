import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { accountId } from './users.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enums/roles.enum';
import { Users } from './users.entity';

@Controller('accounts')
@ApiTags('User Management')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Get all organizations accounts
   * @param req
   */
  @UseGuards(AuthGuard)
  @Get('')
  @ApiBearerAuth('Authorization')
  @Roles(Role.Admin, Role.Super_admin)
  async getAllAccounts(@Request() req: any) {
    const users = await this.usersService.getAccountsList({
      take: 10,
      skip: 0,
    });
    return users.result.filter((user: { password: any }) => {
      delete user.password;
      return users;
    });
  }

  /**
   * Get Current User
   * @param req
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('profile')
  async getProfile(@Request() req: any): Promise<Users> {
    const user = await this.usersService.findOne(req.user.email);
    delete user.password;
    return user;
  }

  /**
   * Get organizations accounts by id
   * @param accountId
   * @param req
   */
  @UseGuards(AuthGuard)
  @Get('/:accountId')
  @ApiParam({
    name: 'accountId',
    type: 'number',
    description: 'The ID of the account',
  })
  @Roles(Role.Admin, Role.Super_admin)
  @ApiBearerAuth('Authorization')
  async getAccountsById(@Param('accountId') accountId: accountId) {
    const user = await this.usersService.getAccountById(accountId);
    delete user.password;
    return user;
  }
}
