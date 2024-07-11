import { Injectable } from '@nestjs/common';
import {
  RequestFormDto,
  RequestFormId,
  UpdatePaymentInformationDto,
  UpdateStatusDto,
} from './dto/request-form.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestForm } from './request-form.entity';
import { Role } from '../enums/roles.enum';
import { User } from '../users/users.service';
import { request } from 'express';
import { isBoolean } from 'class-validator';

@Injectable()
export class RequestFormService {
  constructor(
    @InjectRepository(RequestForm)
    private readonly requestFormRepository: Repository<RequestForm>,
  ) {}
  async store(requestFormDto: RequestFormDto) {
    const requestFormEntity = new RequestForm();
    requestFormEntity.organization_email = requestFormDto.organization.email;
    requestFormEntity.organization_name = requestFormDto.organization.name;
    requestFormEntity.organization_info = requestFormDto.organization.info;
    requestFormEntity.organization_address =
      requestFormDto.organization.address;
    requestFormEntity.organization_website =
      requestFormDto.organization.website;
    requestFormEntity.organization_number = requestFormDto.organization.number;
    requestFormEntity.contact = JSON.stringify(requestFormDto.contact);
    requestFormEntity.fundraiser = JSON.stringify(requestFormDto.fundraiser);

    return await this.requestFormRepository.save(requestFormEntity);
  }

  async getAllRequest(user: User) {
    if (user.roles.includes(Role.Admin)) {
      return this.requestFormRepository.find();
    } else {
      return this.requestFormRepository.find({ where: { user_id: user.id } });
    }
  }

  async show(requestId: number, user: User) {
    /**
     * Admin can access all the form request.
     */
    if (user.roles.includes(Role.Admin)) {
      return this.requestFormRepository.findOne({
        where: { id: requestId },
      });
    }

    /**
     * For organization can access individual request.
     */
    return this.requestFormRepository.findOne({
      where: { id: requestId, user_id: user.id },
    });
  }

  async updateStatus(requestId: number, request: UpdateStatusDto) {
    return await this.requestFormRepository.update(
      { id: requestId },
      { status: request.status, updated_at: new Date() },
    );
  }

  async updatePaymentInformation(
    requestId: number,
    request: UpdatePaymentInformationDto,
  ) {
    return await this.requestFormRepository.update(
      { id: requestId },
      { payment: JSON.stringify(request) },
    );
  }
}
