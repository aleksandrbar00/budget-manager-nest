import { OmitType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class EditCategoryDto extends OmitType(CreateCategoryDto, [
  'owner',
] as const) {}
