import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/roles.enum';
import { accountId } from './users.dto';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<User>,
  ) {}
  private async password(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async users() {
    return [
      {
        userId: 1,
        name: 'scott',
        password: await this.password('@dmin@123'),
        email: 'scott.shubham@rubicotech.in',
        information: 'test',
        address: 'test',
        website: 'https://test.com',
        number: '9999999999',
      },
    ];
  }
  async createUser() {
    const users = await this.users();
    await this.usersRepository.save(users);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository
      .findOne({ where: { email: username } })
      .then((result) => {
        return result;
      });
  }

  async getAccountById(id: accountId): Promise<User | undefined> {
    return this.usersRepository
      .findOne({ where: { id: id } })
      .then((result) => {
        return result;
      });
  }

  async getAccountsList(query): Promise<User | undefined> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';
    const [result, total] = await this.usersRepository.findAndCount({
      where: { roles: Role.Organization },
      take: take,
      skip: skip,
    });
    const paginated = { total: total, page: skip, perPage: take };
    return { result, paginated };
  }
}
