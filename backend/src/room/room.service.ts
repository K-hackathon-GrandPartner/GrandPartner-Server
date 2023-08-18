import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/Room';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll(): Promise<RoomResponseDto[]> {
    const roomsFromDatabase = await this.roomRepository
      .createQueryBuilder('room')
      .select([
        'room.thumbnailImageUrl as imageUrl',
        'room.title',
        'room.roomSize',
        'room.roomFloor',
        'room.deposit',
        'room.monthlyRent',
        'room.address',
        'room.content',
      ])
      .getRawMany();

    const roomResponseDtos: RoomResponseDto[] = roomsFromDatabase.map(
      (room) => ({
        imageUrl: room.imageUrl,
        title: room.title,
        roomSize: room.roomSize,
        roomFloor: room.roomFloor,
        deposit: room.deposit,
        monthlyRent: room.monthlyRent,
        address: room.address,
        content: room.content,
      }),
    );

    return roomResponseDtos;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
