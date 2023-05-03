import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.username = createUserDto.username;
    user.passwordHash = await bcrypt.hash(createUserDto.password, 10);
    user.email = createUserDto.email;
    await this.usersRepository.save(user);
  }

  getByEmailOrUsername(query: string) {
    return this.usersRepository.findOne({
      where: [
        {
          username: query,
        },
        {
          email: query,
        },
      ],
    });
  }
}
