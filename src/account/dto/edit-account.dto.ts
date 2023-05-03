import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class EditAccountDto extends PartialType(CreateAccountDto) {}
