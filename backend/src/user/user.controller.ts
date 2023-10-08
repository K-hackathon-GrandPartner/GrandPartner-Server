import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { LandRordProfileDto } from './dto/user-response.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  private readonly response: ResponseDto;
  constructor(private readonly userService: UserService) {
    this.response = new ResponseDto(200, '성공'); // 초기화
  }
  @Get(':id')
  @ApiOperation({ summary: '임대인 프로필 조회 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: LandRordProfileDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '임대인 ID',
    example: 58,
  })
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    this.response.result = user;
    return this.response;
  }
}
