import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OperationCategoryEntity } from './operation-category.entity';
import { AccountEntity } from '../account/account.entity';
import { PaymentMethodEntity } from '../payment-method/payment-method.entity';

@Entity()
export class OperationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  type: string;

  @ManyToMany(() => OperationCategoryEntity)
  @JoinTable()
  categories: Array<OperationCategoryEntity>;

  @ManyToOne(() => AccountEntity)
  account: AccountEntity;

  @ManyToOne(() => PaymentMethodEntity)
  method: PaymentMethodEntity;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
