import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  RequestFormDto,
  RequestFormId,
  UpdatePaymentInformationDto,
  UpdateStatusDto,
} from './dto/request-form.dto';
import { RequestFormService } from './request-form.service';
import { User } from '../users/users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../enums/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { ValidateRequestFormStatusPipe } from './pipes/validate-request-form-status-pipe.service';
import { UpdateResult } from 'typeorm';
import { ValidatePaymentTypesService } from './pipes/validate-payment-types.service';
import { ValidateRequestFormId } from './pipes/validate-request-form-id.service';

@Controller('request-form')
@ApiTags('Request Form Management')
export class RequestFormController {
  constructor(private requestFormService: RequestFormService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('')
  async index(@Request() request: User) {
    return await this.requestFormService.getAllRequest(request.user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('/:requestId')
  @ApiParam({
    name: 'requestId',
    type: 'number',
    description: 'The ID of the fundraiser form',
  })
  async show(@Param() requestId: RequestFormId, @Request() request: User) {
    return await this.requestFormService.show(
      requestId.requestId,
      request.user,
    );
  }
  @Post('')
  async store(@Body() request: RequestFormDto) {
    return await this.requestFormService.store(request);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Roles(Role.Admin, Role.Super_admin)
  @Patch('/:requestId/update-status')
  async updateStatus(
    @Param(ValidateRequestFormId, ValidateRequestFormStatusPipe)
    requestId: RequestFormId,
    @Body() request: UpdateStatusDto,
  ): Promise<UpdateResult> {
    return this.requestFormService.updateStatus(requestId.requestId, request);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Put('/:requestId/update/payment')
  async updatePaymentInformation(
    @Param(ValidateRequestFormId) requestId: RequestFormId,
    @Body(ValidatePaymentTypesService) request: UpdatePaymentInformationDto,
  ): Promise<UpdateResult> {
    return this.requestFormService.updatePaymentInformation(
      requestId.requestId,
      request,
    );
  }
}
