import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import {
  MagazineResponseDto,
  MagazinesResponseDto,
} from './dto/magazine-response.dto';
import { AuthGuard } from 'src/common/services/auth_guard.service';

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  private readonly response: ResponseDto;
  constructor(private readonly magazineService: MagazineService) {
    this.response = new ResponseDto(200, '성공'); // 초기화
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  @Get()
  @ApiOperation({ summary: '매거진 조회 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: MagazinesResponseDto,
  })
  async findAll() {
    const result = await this.magazineService.findAll();
    return new ResponseDto(200, '성공', result);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  @Get(':id')
  @ApiOperation({ summary: '매거진 상세 조회 API' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '매거진 ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: MagazineResponseDto,
  })
  async findOne(@Param('id') id: string) {
    const result = await this.magazineService.findOne(+id);
    return new ResponseDto(200, '성공', result);
  }
}
