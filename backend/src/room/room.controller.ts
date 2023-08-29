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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { RoomFilterDto } from './dto/filter-room.dto';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  private response: BaseResponseDto;
  constructor(private readonly roomService: RoomService) {
    this.response = new BaseResponseDto();
  }

  @Post()
  @ApiOperation({ summary: '방 등록 API' })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @ApiBody({
    type: CreateRoomDto,
    description: '방 등록 정보',
    examples: {
      createRoomDto: {
        summary: '방 등록 정보',
        value: {
          images: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwk',
          ],
          deposit: 500,
          monthlyRent: 30,
          buildingType: '아파트',
          buildingFloor: 3,
          roomFloor: 3,
          roomSize: 16.5,
          moveInDate: '8월 중순 가능',
          roomOptions: ['에어컨', '욕실', '침대'],
          commuteTime: 22,
          smoking: false,
          drinking: false,
          religion: '개신교',
          careServices: ['주 1회 장보기', '월 2회 외출 도움'],
          safetyFacilities: ['CCTV', '화재 경보기'],
          pets: ['강아지', '고양이'],
          title: '방 제목',
          description: '방 상세 설명',
        },
      },
    },
  })
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
    example: 0,
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
  @ApiQuery({
    name: 'roomSizeTypes',
    required: false,
    description: '방 크기(소형, 중형, 대형, 대형+)',
    examples: {
      roomSizeTypes0: {
        summary: '방 크기 0개 선택',
        value: ['소형', '중형', '대형', '대형+'],
      },
      roomSizeTypes1: {
        summary: '방 크기 1개 선택',
        value: ['소형'],
      },
      roomSizeTypes2: {
        summary: '방 크기 2개 선택',
        value: ['소형', '중형'],
      },
    },
  })
  @ApiQuery({
    name: 'roomOptions',
    required: false,
    description:
      '방 옵션(욕실, 주방 공유, 침대, 세탁기 공유, 에어컨, 엘리베이터, 책상, 유료 주차, 무료 주차, 옷장, 무선 인터넷, TV)',
    examples: {
      roomOptions1: {
        summary: '방 옵션 1개 선택',
        value: ['욕실'],
      },
    },
  })
  async findAll(@Query() filterDto: RoomFilterDto) {
    const rooms = await this.roomService.findAll(filterDto);
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
    example: 13,
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
