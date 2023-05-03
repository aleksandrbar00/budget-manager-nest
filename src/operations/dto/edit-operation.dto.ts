import { PartialType } from '@nestjs/swagger';
import { CreateOperationDto } from './create-operation.dto';

export class EditOperationDto extends PartialType(CreateOperationDto) {}
