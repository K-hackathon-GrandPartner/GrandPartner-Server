import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDto, RoomsResponseDto } from './dto/room-response.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  private response: BaseResponseDto;
  constructor(private readonly roomService: RoomService) {
    this.response = new BaseResponseDto();
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: '방 조회 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: RoomsResponseDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'startDeposit',
    required: false,
    description: '보증금(만원) 시작 범위',
    example: 0,
  })
  @ApiQuery({
    name: 'endDeposit',
    required: false,
    description: '보증금(만원) 끝 범위',
    example: 1000,
  })
  @ApiQuery({
    name: 'startMonthlyRent',
    required: false,
    description: '월세(만원) 시작 범위',
    example: 20,
  })
  @ApiQuery({
    name: 'endMonthlyRent',
    required: false,
    description: '월세(만원) 끝 범위',
    example: 100,
  })
  @ApiQuery({
    name: 'regions',
    required: false,
    description: '지역(광진구, 노원구, 성북구)',
    examples: {
      regions0: {
        summary: '지역 0개 선택',
        value: ['광진구', '노원구', '성북구'],
      },
      regions1: {
        summary: '지역 1개 선택',
        value: ['노원구'],
      },
      regions2: {
        summary: '지역 2개 선택',
        value: ['광진구', '노원구'],
      },
      regions3: {
        summary: '지역 3개 선택',
        value: ['광진구', '노원구', '성북구'],
      },
    },
  })
  @ApiQuery({
    name: 'buildingTypes',
    required: false,
    description: '건물 유형(아파트, 오피스텔, 빌라, 단독 주택)',
    examples: {
      buildingTypes0: {
        summary: '건물 유형 0개 선택',
        value: ['아파트', '오피스텔', '빌라', '단독 주택'],
      },
      buildingTypes1: {
        summary: '건물 유형 1개 선택',
        value: ['아파트'],
      },
      buildingTypes2: {
        summary: '건물 유형 2개 선택',
        value: ['아파트', '오피스텔'],
      },
    },
  })
  async findAll(
    @Query('startDeposit') startDeposit?: string,
    @Query('endDeposit') endDeposit?: string,
    @Query('startMonthlyRent') startMonthlyRent?: string,
    @Query('endMonthlyRent') endMonthlyRent?: string,
    @Query('regions') regions?: string[],
    @Query('buildingTypes') buildingTypes?: string[],
    @Query('roomSizeTypes') roomSizeTypes?: string[],
  ) {
    if (startDeposit === undefined) startDeposit = '0';
    if (endDeposit === undefined) endDeposit = '100000';
    if (startMonthlyRent === undefined) startMonthlyRent = '0';
    if (endMonthlyRent === undefined) endMonthlyRent = '100000';
    if (regions === undefined) regions = ['광진구', '노원구', '성북구'];
    if (buildingTypes === undefined)
      buildingTypes = ['아파트', '오피스텔', '빌라', '단독 주택'];
    if (roomSizeTypes === undefined)
      roomSizeTypes = ['소형', '중형', '대형', '대형+'];
    const rooms = await this.roomService.findAll(
      +startDeposit,
      +endDeposit,
      +startMonthlyRent,
      +endMonthlyRent,
      typeof regions === 'string' ? [regions] : regions,
      typeof buildingTypes === 'string' ? [buildingTypes] : buildingTypes,
      typeof roomSizeTypes === 'string' ? [roomSizeTypes] : roomSizeTypes,
    );
    return this.response.success(rooms);
  }

  @Get(':id')
  @ApiOperation({ summary: '방 상세 조회 API' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: RoomResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '방 ID',
    example: 1,
  })
  async findOne(@Param('id') id: number) {
    const room = await this.roomService.findOne(id);
    return this.response.success(room);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
