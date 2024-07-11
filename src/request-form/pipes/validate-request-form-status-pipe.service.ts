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
export class ValidateRequestFormStatusPipe implements PipeTransform {
  constructor(
    @InjectRepository(RequestForm)
    private requestFormRepository: Repository<RequestForm>,
  ) {}

  async transform(value: any) {
    const requestId = value.requestId;
    const data = await this.requestFormRepository.findOne({
      where: { id: requestId },
    });
    const { payment, products, questions } = data;

    const paymentData = JSON.parse(payment);
    if (!paymentData)
      this.throwExceptionMessage('The Payment Detail is required');

    const productsData = JSON.parse(products);
    if (!productsData)
      this.throwExceptionMessage('The Product Detail is required');

    const questionsData = JSON.parse(questions);
    if (!questionsData)
      this.throwExceptionMessage('The Questions detail is required');
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
