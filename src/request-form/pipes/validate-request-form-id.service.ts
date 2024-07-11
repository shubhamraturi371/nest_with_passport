import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestForm } from '../request-form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateRequestFormId implements PipeTransform {
  constructor(
    @InjectRepository(RequestForm)
    private requestFormRepository: Repository<RequestForm>,
  ) {}

  async transform(value: any) {
    const requestId = value.requestId;
    const data = await this.requestFormRepository.findOne({
      where: { id: requestId },
    });
    if (!data) this.throwExceptionMessage('Request form not found');
    return value;
  }

  public throwExceptionMessage(message: string) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
