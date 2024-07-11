import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UploadedFiles,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
@Injectable()
export class SuggestedPriceValidationPipe implements PipeTransform {
  async transform(value: any) {
    if (value.price < value.suggested_price) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Suggested Price should be less then cost price',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return value;
  }
}
