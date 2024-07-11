export enum PaymentEnum {
  CARD = 'CARD',
  CASH = 'CASH',
}

export enum PaymentEnumInt {
  CARD = 1,
  CASH = 2,
}
export const paymentTypes = [];
paymentTypes[PaymentEnumInt.CASH] = PaymentEnum.CASH;
paymentTypes[PaymentEnumInt.CARD] = PaymentEnum.CARD;
