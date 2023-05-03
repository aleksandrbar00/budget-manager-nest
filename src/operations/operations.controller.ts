import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { OperationsService } from './operations.service';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { OperationsCategoryService } from './operations-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { EditOperationDto } from './dto/edit-operation.dto';

@ApiTags('operations')
@Controller('operations')
export class OperationsController {
  constructor(
    private operationsService: OperationsService,
    private operationsCategoryService: OperationsCategoryService,
  ) {}

  @ApiOperation({ summary: 'new category' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.operationsCategoryService.createNewCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'list user categories' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/categories/list')
  userCategoriesList(@Query('userId') userId: number) {
    return this.operationsCategoryService.getUserList(userId);
  }

  @ApiOperation({ summary: 'edit category' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put('/categories/:id')
  editCategory(
    @Param('id') id: number,
    @Body() editCategoryDto: EditCategoryDto,
  ) {
    return this.operationsCategoryService.editCategory(id, editCategoryDto);
  }

  @ApiOperation({ summary: 'delete category' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('/categories/:id')
  deleteCategory(@Param('id') id: number) {
    return this.operationsCategoryService.deleteCategory(id);
  }

  @ApiOperation({ summary: 'new operation' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/')
  newOperation(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.newTransaction(createOperationDto);
  }

  @ApiOperation({ summary: 'edit operation' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put('/:id')
  editOperation(
    @Param('id') id: number,
    @Body() editOperationDto: EditOperationDto,
  ) {
    return this.operationsService.editOperation(id, editOperationDto);
  }

  @ApiOperation({ summary: 'delete operation' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteOperation(@Param('id') id: number) {
    return this.operationsService.deleteTransaction(id);
  }

  @ApiOperation({ summary: 'find operations' })
  @ApiBearerAuth()
  @ApiImplicitQuery({
    name: 'amount_from',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'amount_to',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'from',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'to',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'card',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'type',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'categories',
    required: false,
  })
  @UseGuards(JwtGuard)
  @Get('/')
  accountOperations(
    @Query('accountId') accountId?: number,
    @Query('amountFrom') amountFrom?: number,
    @Query('amountTo') amountTo?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('card') card?: number,
    @Query('type') type?: string,
    @Query('categories') categories?: Array<number>,
  ) {
    return this.operationsService.getAccountTransactions(accountId, {
      amountFrom,
      amountTo,
      categories,
      from,
      card,
      type,
      to,
    });
  }
}
