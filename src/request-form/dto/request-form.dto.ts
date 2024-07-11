// organization.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentEnumInt } from '../../enums/payment.enum';

export class OrganizationDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  info: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  website: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  number: string;
}

// contact.dto.ts
export class ContactDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  info: string;
}

// fundraiser.dto.ts
export class FundraiserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pickup_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class RequestFormDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OrganizationDTO)
  public organization: OrganizationDTO;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDTO)
  public contact: ContactDTO;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FundraiserDTO)
  public fundraiser: FundraiserDTO;
}

export class RequestFormId {
  @IsNumberString()
  @ApiProperty({ required: false })
  requestId: number;
}

export class UpdateStatusDto {
  @IsNumber()
  @ApiProperty({ required: true })
  status: number;

  @IsString()
  @ApiProperty({ required: true })
  reason: string;
}
export class PaymentTypes {
  @IsEnum(PaymentEnumInt)
  @IsIn([PaymentEnumInt.CARD, PaymentEnumInt.CASH])
  @ApiProperty({ enum: [PaymentEnumInt.CARD, PaymentEnumInt.CASH] })
  type: PaymentEnumInt;

  @IsBoolean()
  @ApiProperty({ required: true })
  value: boolean;
}
export class UpdatePaymentInformationDto {
  @IsArray()
  @ApiProperty({ type: [PaymentTypes] })
  payment: PaymentTypes[];
}
