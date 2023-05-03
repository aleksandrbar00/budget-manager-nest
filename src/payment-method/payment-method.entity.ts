import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity()
export class PaymentMethodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  color: string;

  @Column()
  isActive: boolean;

  @Column()
  cardNumbers: string;

  @ManyToOne(() => AccountEntity)
  account: AccountEntity;
}
