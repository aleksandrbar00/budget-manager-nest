import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationEntity } from './operation.entity';
import {
  Between,
  DataSource,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateOperationDto } from './dto/create-operation.dto';
import { AccountService } from '../account/account.service';
import { EditOperationDto } from './dto/edit-operation.dto';
import { AccountEntity } from '../account/account.entity';
import { OperationCategoryEntity } from './operation-category.entity';
import { sub } from 'date-fns';
import { PaymentMethodService } from '../payment-method/payment-method.service';

function getPeriodFilter(period: 'day' | 'week' | 'month') {
  let duration: Record<string, number> = {};

  if (period === 'day') {
    duration = {
      days: 1,
    };
  }

  if (period === 'week') {
    duration = {
      weeks: 1,
    };
  }

  if (period === 'month') {
    duration = {
      months: 1,
    };
  }

  return Between(
    sub(new Date(), duration).toDateString(),
    new Date().toDateString(),
  );
}

function getFilterData<T>(from: T, to: T) {
  if (from && !to) {
    return MoreThanOrEqual(from);
  }

  if (to && !from) {
    return LessThanOrEqual(to);
  }

  if (to && from) {
    return Between(from, to);
  }
}

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(OperationEntity)
    private operationRepository: Repository<OperationEntity>,
    private dataSource: DataSource,
    private accountService: AccountService,
    private paymentMethodService: PaymentMethodService,
  ) {}

  async getAccountTransactions(
    accountId: number,
    filters: Partial<{
      limit: number;
      offset: number;
      amountFrom: number;
      amountTo: number;
      categories: Array<number>;
      from: string;
      to: string;
      card: number;
      type: string;
    }>,
  ) {
    return this.operationRepository.find({
      relations: ['categories', 'method'],
      where: {
        account: {
          id: accountId,
        },
        ...(filters.card && {
          method: {
            id: filters.card,
          },
        }),
        ...(filters.type && {
          type: filters.type,
        }),
        ...(filters.categories && {
          categories: {
            id: In(filters.categories),
          },
        }),
        ...((filters.amountFrom || filters.amountTo) && {
          amount: getFilterData(filters.amountFrom, filters.amountTo),
        }),
        ...((filters.from || filters.to) && {
          createdAt: getFilterData(filters.from, filters.to),
        }),
      },
    });
  }

  async getDayOperationCount(accountId: number) {
    return this.operationRepository.count({
      where: {
        account: {
          id: accountId,
        },
      },
    });
  }

  async editOperation(id: number, editOperationDto: EditOperationDto) {
    const operation = await this.operationRepository.findOne({ where: { id } });

    if (editOperationDto.account) {
      operation.account = { id: editOperationDto.account } as AccountEntity;
    }

    if (editOperationDto.categories) {
      operation.categories = editOperationDto.categories.map((id) => ({
        id,
      })) as Array<OperationCategoryEntity>;
    }

    return this.operationRepository.save(operation);
  }

  async deleteTransaction(id: number) {
    return this.operationRepository.delete(id);
  }

  async getPeriodOperationsAmounts(
    accountId: number,
    period: 'day' | 'week' | 'month',
  ) {
    return this.operationRepository.find({
      select: ['id', 'amount', 'type'],
      where: {
        account: {
          id: accountId,
        },
        createdAt: getPeriodFilter(period),
      },
    });
  }

  async newTransaction(createOperationDto: CreateOperationDto) {
    const account = await this.accountService.getById(
      createOperationDto.account,
    );

    if (account) {
      return this.dataSource.transaction(async (manager) => {
        const operation = new OperationEntity();

        operation.account = account;
        operation.amount = createOperationDto.amount;
        operation.type = createOperationDto.type;
        operation.title = createOperationDto.title;

        if (createOperationDto.categories.length) {
          operation.categories = createOperationDto.categories.map((id) => ({
            id,
          })) as Array<OperationCategoryEntity>;
        }

        await this.accountService.updateAccountBalance(
          {
            account,
            operationType: operation.type as 'income' | 'outcome',
            amount: operation.amount,
          },
          manager,
        );

        if (createOperationDto.card) {
          operation.method = await this.paymentMethodService.getById(
            createOperationDto.card,
          );
        }

        return manager.save(operation);
      });
    }
  }
}
