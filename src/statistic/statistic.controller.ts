import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt-auth.guard';

@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @ApiOperation({ summary: 'get accounts day profits' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/day-profits')
  getDayProfits(
    @Query('accountId') accountId: number,
    @Query('period') period: 'day' | 'week' | 'month',
  ) {
    return this.statisticService.getPeriodProfits(accountId, period ?? 'day');
  }
}
