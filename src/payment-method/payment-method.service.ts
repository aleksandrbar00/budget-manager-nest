import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './payment-method.entity';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { AccountService } from '../account/account.service';
import { AccountEntity } from '../account/account.entity';
import { EditPaymentMethodDto } from './dto/edit-payment-method.dto';

export class PaymentMethodService {
  constructor(
    private accountService: AccountService,
    @InjectRepository(PaymentMethodEntity)
    private paymentMethodRepository: Repository<PaymentMethodEntity>,
  ) {}

  async getById(id: number) {
    return this.paymentMethodRepository.findOne({
      where: {
        id,
      },
    });
  }

  async newPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto) {
    const method = new PaymentMethodEntity();
    method.type = createPaymentMethodDto.type;
    method.cardNumbers = createPaymentMethodDto.cardNumbers;

    const account = new AccountEntity();
    account.id = createPaymentMethodDto.account;
    method.account = account;

    method.name = createPaymentMethodDto.name;
    method.color = createPaymentMethodDto.color;
    method.isActive = createPaymentMethodDto.isActive;

    return this.paymentMethodRepository.save(method);
  }

  async editMethod(id: number, editPaymentMethod: EditPaymentMethodDto) {
    return this.paymentMethodRepository.update(id, editPaymentMethod);
  }

  async getAccountMethods(accountId: number) {
    return this.paymentMethodRepository.find({
      where: {
        account: {
          id: accountId,
        },
      },
    });
  }
}
