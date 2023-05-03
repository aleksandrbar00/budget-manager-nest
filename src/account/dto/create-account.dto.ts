import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  isActive: boolean;
}
