import { Injectable } from '@nestjs/common';
import { Fundraisers } from './fundraisers.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Role } from '../enums/roles.enum';
@Injectable()
export class FundraisersService {
  constructor(
    @InjectRepository(Fundraisers)
    private fundraisersRepository: Repository<Fundraisers>,
  ) {}
  public async getAccountsList(user: Users) {
    if (user.roles.includes(Role.Admin)) {
      return this.fundraisersRepository.find();
    } else {
      return this.fundraisersRepository.find({ where: { user_id: user.id } });
    }
  }
}
