import { Injectable } from '@nestjs/common';
import * as Currency from 'currency.js';

@Injectable()
export class CurrencyService {
  private getCurrencyInstance(amount: number) {
    return new Currency(amount);
  }

  addAmount(current: number, amount: number) {
    return this.getCurrencyInstance(current).add(amount);
  }
}
