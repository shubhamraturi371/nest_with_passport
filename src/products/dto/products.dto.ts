import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgumentMetadata } from '@nestjs/common';
export class StoreProductDTO {
  @ApiProperty({ type: 'file' })
  image: Express.Multer.File;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumberString()
  @Type(() => String)
  price: bigint;

  @ApiProperty()
  @IsNumberString()
  @Type(() => String)
  suggested_price: bigint;
}
