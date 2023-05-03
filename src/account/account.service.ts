import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserService } from '../user/user.service';
import { EditAccountDto } from './dto/edit-account.dto';
import * as Currency from 'currency.js';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private userService: UserService,
  ) {}

  async getById(id: number) {
    return this.accountRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUserAccounts(userId: number) {
    return this.accountRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async updateAccountBalance(
    {
      account,
      operationType,
      amount,
    }: {
      account: AccountEntity;
      operationType: 'income' | 'outcome';
      amount: number;
    },
    entityManager?: EntityManager,
  ) {
    const balance = new Currency(account.amount);

    account.amount =
      operationType === 'income'
        ? balance.add(amount).value
        : balance.subtract(amount).value;

    return entityManager
      ? entityManager.save(account)
      : this.accountRepository.save(account);
  }

  async deleteAccount(id: number) {
    return this.accountRepository.delete(id);
  }

  async editAccount(id: number, editAccountDto: EditAccountDto) {
    return this.accountRepository.update(id, editAccountDto);
  }

  async openUserAccount(userId: number, newAccountDto: CreateAccountDto) {
    const user = await this.userService.getById(userId);

    if (user) {
      const account = new AccountEntity();
      account.name = newAccountDto.name;
      account.isActive = newAccountDto.isActive;
      account.amount = newAccountDto.amount;
      account.owner = user;

      return this.accountRepository.save(account);
    }
  }
}
