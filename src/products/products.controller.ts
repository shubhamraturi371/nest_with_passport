import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StoreProductDTO } from './dto/products.dto';
import { diskStorage } from 'multer';
import { FileUploadPipe } from './pipes/file-uploader.pipe';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import e from 'express';
import { SuggestedPriceValidationPipe } from './pipes/suggested-price-validation.pipe';

@Controller('products')
@ApiTags('Products Management')
@UseInterceptors(FileInterceptor('image'))
@ApiConsumes('multipart/form-data')
export class ProductsController {
  constructor(protected productService: ProductsService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  async store(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|jpg|png',
        })
        .addMaxSizeValidator({
          maxSize: 500000,
          message: 'Image file must be less then 5MB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body(SuggestedPriceValidationPipe) productData: StoreProductDTO,
  ): Promise<Products> {
    return this.productService.store(file, productData);
  }
}
