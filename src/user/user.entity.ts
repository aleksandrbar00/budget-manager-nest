import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  passwordHash: string;

  @OneToMany(() => AccountEntity, (account) => account.owner)
  accounts: Array<AccountEntity>;
}
