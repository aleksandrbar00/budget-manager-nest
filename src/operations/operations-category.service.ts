import { InjectRepository } from '@nestjs/typeorm';
import { OperationCategoryEntity } from './operation-category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserEntity } from '../user/user.entity';
import { EditCategoryDto } from './dto/edit-category.dto';

export class OperationsCategoryService {
  constructor(
    @InjectRepository(OperationCategoryEntity)
    private operationCategoryRepository: Repository<OperationCategoryEntity>,
  ) {}

  async createNewCategory(createCategoryDto: CreateCategoryDto) {
    const category = new OperationCategoryEntity();

    category.owner = { id: createCategoryDto.owner } as UserEntity;
    category.name = createCategoryDto.name;

    return this.operationCategoryRepository.save(category);
  }

  async getUserList(userId: number) {
    return this.operationCategoryRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async deleteCategory(id: number) {
    return this.operationCategoryRepository.delete(id);
  }

  async editCategory(id: number, editCategoryDto: EditCategoryDto) {
    return this.operationCategoryRepository.update(id, editCategoryDto);
  }
}
