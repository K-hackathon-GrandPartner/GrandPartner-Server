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
        'room.id as id',
        'room.buildingType as building_type',
        'room.roomSize as room_size',
        'room.roomFloor as room_floor',
        'room.deposit as deposit',
        'room.monthlyRent as monthly_rent',
        'room.address as address',
        'room.postDate as post_date',
      ])
      .getRawMany();

    const roomResponseDtos = roomsFromDatabase.map((col) => {
      let roomSizeType = '';
      let buildingType = '';

      if (col.room_size > 0 && col.room_size <= 3.3 * 3) {
        roomSizeType = '소형';
      } else if (col.room_size > 3.3 * 3 && col.room_size <= 3.3 * 5) {
        roomSizeType = '중형';
      } else if (col.room_size > 3.3 * 5 && col.room_size <= 3.3 * 6) {
        roomSizeType = '대형';
      } else if (col.room_size > 3.3 * 6) {
        roomSizeType = '대형+';
      }

      if (col.building_type === 1) {
        buildingType = '단독주택';
      } else if (col.building_type === 2) {
        buildingType = '오피스텔';
      } else if (col.building_type === 3) {
        buildingType = '아파트';
      } else if (col.building_type === 4) {
        buildingType = '빌라';
      }

      return {
        id: col.id,
        imageUrl:
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/163687953364064240.jpg?gif=1&w=480&h=480&c=c&q=80&webp=1',
        buildingType: buildingType,
        roomSizeType: roomSizeType,
        roomSize: col.room_size,
        roomFloor: col.room_floor,
        deposit: col.deposit,
        monthlyRent: col.monthly_rent,
        address: col.address,
        title: 'test',
        postDate: col.post_date,
      };
    });

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
