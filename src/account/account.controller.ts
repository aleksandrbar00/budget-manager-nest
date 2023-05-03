import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EditAccountDto } from './dto/edit-account.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiOperation({ summary: 'open new account' })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post('/open')
  openAccount(@Request() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.openUserAccount(req.user.id, createAccountDto);
  }

  @ApiOperation({ summary: 'list users accounts' })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('/list')
  getUserAccounts(@Query('userId') userId: number) {
    return this.accountService.getUserAccounts(userId);
  }

  @ApiOperation({ summary: 'edit account' })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Put('/:id')
  editAccount(@Param('id') id: number, @Body() editAccountDto: EditAccountDto) {
    return this.accountService.editAccount(id, editAccountDto);
  }

  @ApiOperation({ summary: 'delete account' })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteAccount(@Param('id') id: number) {
    return this.accountService.deleteAccount(id);
  }
}
