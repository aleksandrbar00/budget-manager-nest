import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';

export class EditPaymentMethodDto extends PartialType(
  OmitType(CreatePaymentMethodDto, ['account'] as const),
) {}
