import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
export class accountId {
  @ApiProperty({ required: true })
  @IsNumber()
  accountId: number;
}
