import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  account: number;

  @ApiProperty({
    required: false,
  })
  card?: number;

  @ApiProperty()
  categories: Array<number>;
}
