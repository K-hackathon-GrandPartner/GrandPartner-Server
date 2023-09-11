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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { RoomFilterDto } from './dto/filter-room.dto';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  private readonly response: ResponseDto;
  constructor(private readonly roomService: RoomService) {
    this.response = new ResponseDto(200, '성공', null); // 초기화
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
  async findAll(@Query() filterDto: RoomFilterDto): Promise<ResponseDto> {
    const rooms = await this.roomService.findAll(filterDto);
    this.response.result = rooms;
    return this.response;
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
  async findOne(@Param('id') id: number): Promise<ResponseDto> {
    const room = await this.roomService.findOne(id);
    this.response.result = room;
    return this.response;
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
