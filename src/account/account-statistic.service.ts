import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm';

export class AccountStatisticService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  getPeriodProfits(id: number, period: 'day' | 'week' | 'month') {
    return this.accountRepository.find({
      where: {
        id,
      },
    });
  }
}
