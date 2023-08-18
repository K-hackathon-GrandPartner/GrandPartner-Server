import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Image } from './entities/image.entity';
import { In, Repository } from 'typeorm';

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
        'room.roomSize as room_size',
        'room.roomFloor as room_floor',
        'room.deposit as deposit',
        'room.monthlyRent as monthly_rent',
        'room.address as address',
      ])
      .getRawMany();

    const roomResponseDtos: RoomResponseDto[] = roomsFromDatabase.map(
      (col) => ({
        imageUrl: 'http://',
        title: 'test',
        roomSize: col.room_size,
        roomFloor: col.room_floor,
        deposit: col.deposit,
        monthlyRent: col.monthly_rent,
        address: col.address,
        content: 'test',
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
