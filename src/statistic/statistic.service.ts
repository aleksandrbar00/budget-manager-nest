import { Injectable } from '@nestjs/common';
import { OperationsService } from '../operations/operations.service';
import * as Currency from 'currency.js';

@Injectable()
export class StatisticService {
  constructor(private operationsService: OperationsService) {}

  async getPeriodProfits(id: number, period: 'day' | 'week' | 'month') {
    const data = await this.operationsService.getPeriodOperationsAmounts(
      id,
      period,
    );

    let totalIncome = new Currency(0);
    let totalOutcome = new Currency(0);

    data.forEach(({ type, amount }) => {
      if (type === 'income') {
        totalIncome = totalIncome.add(amount);
      } else {
        totalOutcome = totalOutcome.add(amount);
      }
    });

    return {
      totalIncome: totalIncome.value,
      totalOutcome: totalOutcome.value,
    };
  }
}
