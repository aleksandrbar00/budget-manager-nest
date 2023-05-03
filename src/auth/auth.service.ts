import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  async validateUser(login: string, pass: string) {
    try {
      const user = await this.userService.getByEmailOrUsername(login);
      const isValidPass =
        user && (await bcrypt.compare(pass, user.passwordHash));

      if (isValidPass) {
        const { passwordHash, ...data } = user;
        return data;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async getUserToken(user: Omit<UserEntity, 'passwordHash'>) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      id: payload.sub,
      access_token: this.jwtService.sign(payload),
    };
  }
}
