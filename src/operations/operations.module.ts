import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationCategoryEntity } from './operation-category.entity';
import { OperationEntity } from './operation.entity';
import { AccountModule } from '../account/account.module';
import { OperationsCategoryService } from './operations-category.service';
import { PaymentMethodModule } from '../payment-method/payment-method.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OperationCategoryEntity, OperationEntity]),
    AccountModule,
    PaymentMethodModule,
  ],
  controllers: [OperationsController],
  providers: [OperationsService, OperationsCategoryService],
  exports: [OperationsService],
})
export class OperationsModule {}
