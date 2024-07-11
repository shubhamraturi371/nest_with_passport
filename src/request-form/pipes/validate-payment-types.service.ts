import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  PaymentEnum,
  PaymentEnumInt,
  paymentTypes,
} from '../../enums/payment.enum';

@Injectable()
export class ValidatePaymentTypesService implements PipeTransform {
  transform(value: any): any {
    const paymentArray = [];
    const paymentData = value.payment;
    paymentData.map((payment: { type: PaymentEnumInt; value: PaymentEnum }) => {
      if (paymentTypes[payment.type] === undefined)
        throw this.throwExceptionMessage(
          `Payment Type ${payment.type} not found`,
        );

      const paymentObject = {
        type: payment.type,
        value: paymentTypes[payment.type],
        is_active: payment.value,
      };

      const typeExist = paymentArray.some(
        (payment) => payment.type === paymentObject.type,
      );

      if (typeExist) {
        // Check if type is duplication in request
        throw this.throwExceptionMessage(`Payment type is duplicate`);
      }

      paymentArray.push(paymentObject);
    });
    return paymentArray;
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
