import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethodService } from './payment-method.service';
import { EditPaymentMethodDto } from './dto/edit-payment-method.dto';

@ApiTags('payment-method')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'new payment card' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/')
  createPaymentMethod(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.newPaymentMethod(createPaymentMethodDto);
  }

  @ApiOperation({ summary: 'list account payment cards' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/list')
  getAccountPaymentMethods(@Query('accountId') accountId: number) {
    return this.paymentMethodService.getAccountMethods(accountId);
  }

  @ApiOperation({ summary: 'edit payment card' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put('/:id')
  editPaymentMethods(
    @Param('id') id: number,
    @Body() editPaymentMethodDto: EditPaymentMethodDto,
  ) {
    return this.paymentMethodService.editMethod(id, editPaymentMethodDto);
  }
}
