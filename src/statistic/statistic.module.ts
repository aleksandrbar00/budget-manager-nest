import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { OperationsModule } from '../operations/operations.module';

@Module({
  imports: [OperationsModule],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
