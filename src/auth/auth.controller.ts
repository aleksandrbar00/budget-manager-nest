import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login user' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.getUserToken(req.user);
  }

  @ApiOperation({ summary: 'register user' })
  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
