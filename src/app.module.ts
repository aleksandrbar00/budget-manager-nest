import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/account.entity';
import { OperationsModule } from './operations/operations.module';
import { OperationCategoryEntity } from './operations/operation-category.entity';
import { OperationEntity } from './operations/operation.entity';
import { StatisticModule } from './statistic/statistic.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentMethodEntity } from './payment-method/payment-method.entity';
import { CurrencyService } from './utils/currency-service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'budget-manager',
      synchronize: true,
      entities: [
        UserEntity,
        AccountEntity,
        OperationCategoryEntity,
        OperationEntity,
        PaymentMethodEntity,
      ],
    }),
    AuthModule,
    UserModule,
    AccountModule,
    OperationsModule,
    StatisticModule,
    PaymentMethodModule,
  ],
  providers: [CurrencyService],
})
export class AppModule {}
