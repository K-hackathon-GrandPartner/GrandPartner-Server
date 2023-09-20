import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { AuthGuard } from 'src/common/services/auth_guard.service';

@Controller('contract')
@ApiTags('Contract')
export class ContractController {
  private readonly response: ResponseDto;
  constructor(private readonly contractService: ContractService) {
    this.response = new ResponseDto(200, '성공'); // 초기화
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  @Get('/check-list')
  @ApiOperation({ summary: '체크리스트 조회 API' })
  getCheckList(@Req() request) {
    const { user_id: userId } = request['user'];
    //TODO: 체크리스트 조회 API
  }
}
