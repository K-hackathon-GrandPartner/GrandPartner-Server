import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsResponseDto } from './dto/room-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async findAll(): Promise<any> {
    const rooms = await this.roomService.findAll();
    return this.response.success(rooms);
  }

  @Get(':id')
  @ApiOperation({ summary: '방 상세 조회 API' })
  async findOne(@Param('id') id: string): Promise<any> {
    const room = await this.roomService.findOne(+id);
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
