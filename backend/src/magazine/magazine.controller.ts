import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import {
  MagazineResponseDto,
  MagazinesResponseDto,
} from './dto/magazine-response.dto';

@Controller('magazine')
@ApiTags('Magazine')
export class MagazineController {
  private readonly response: ResponseDto;
  constructor(private readonly magazineService: MagazineService) {
    this.response = new ResponseDto(200, '성공'); // 초기화
  }

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

  @Get(':id')
  @ApiOperation({ summary: '매거진 상세 조회 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: MagazineResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.magazineService.findOne(+id);
  }
}
