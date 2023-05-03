import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  account: number;

  @ApiProperty()
  type: 'debit' | 'crdit';

  @ApiProperty()
  color: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  cardNumbers: string;
}
