import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsResponseDto, RoomResponseDto } from './dto/room-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import {
  formatDate,
  formatRoomSizeType,
  formatBuildingType,
  omitId,
  omitIds,
} from './utils/format';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {
    this.roomRepository = roomRepository;
  }

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll(): Promise<RoomsResponseDto[]> {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.images', 'image')
      .leftJoinAndSelect('room.detail', 'detail')
      .select([
        'room.id as id',
        'COALESCE(image.imageUrl, :defaultImageUrl) as imageUrl',
        'room.buildingType as buildingType',
        'room.roomSize as roomSize',
        'room.roomFloor as roomFloor',
        'room.deposit as deposit',
        'room.monthlyRent as monthlyRent',
        'room.address as address',
        'detail.title as title',
        'COALESCE(detail.title, :defaultTitle) as title',
        'room.postDate as postDate',
      ])
      .where('(image.thumbnail = 1 OR image.thumbnail IS NULL)')
      .setParameters({
        defaultImageUrl:
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/163687953364064240.jpg?gif=1&w=480&h=480&c=c&q=80&webp=1',
        defaultTitle: '건국대 도보 5분 거리, 즉시 입주 가능.',
      })
      .getRawMany();

    return rooms.map((col) => ({
      id: col.id,
      imageUrl: col.imageUrl,
      buildingType: formatBuildingType(col.buildingType),
      roomSizeType: formatRoomSizeType(col.roomSize),
      roomSize: col.roomSize,
      roomFloor: col.roomFloor,
      deposit: col.deposit,
      monthlyRent: col.monthlyRent,
      address: col.address,
      title: col.title || '건국대 도보 5분 거리, 즉시 입주 가능.', // 기본 제목 적용
      postDate: formatDate(col.postDate),
    }));
  }

  async findOne(id: number): Promise<any> {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.images', 'image')
      .leftJoinAndSelect('room.detail', 'detail')
      .leftJoinAndSelect('room.option', 'option')
      .leftJoinAndSelect('room.rule', 'rule')
      .leftJoinAndSelect('room.safety', 'safety')
      .leftJoinAndSelect('room.careServices', 'careService')
      .leftJoinAndSelect('room.pet', 'pet')
      .where('room.id = :id', { id })
      .getOne();

    if (room) {
      const {
        images,
        detail,
        option,
        rule,
        safety,
        careServices,
        pet,
        ...restRoom
      } = room;

      return {
        ...omitIds(restRoom, ['status', 'landlordId']),
        postDate: formatDate(String(restRoom.postDate)),
        updateDate: formatDate(String(restRoom.updateDate)),
        images: images.map((img) => img.imageUrl),
        detail: omitId(detail),
        option: omitId(option),
        rule: omitId(rule),
        safety: omitId(safety),
        pet: omitId(pet),
        careServices: careServices.map((service) => service.content),
      };
    }

    return null; // 해당 id에 해당하는 room이 없을 경우
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
