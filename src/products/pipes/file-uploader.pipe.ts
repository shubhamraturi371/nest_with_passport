import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
@Injectable()
export class FileUploadPipe implements PipeTransform {
  async transform(value: any) {
    const file = value;
    console.log(file);
    return value;
  }
}
