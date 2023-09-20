import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CareService } from './care_service.entity';
import { Detail } from './detail.entity';
import { Image } from './image.entity';
import { Option } from './option.entity';
import { Pet } from './pet.entity';
import { Rule } from './rule.entity';
import { Safety } from './safety.entity';
import { Address } from './address.entity';
import { Contract } from './contract.entity';

@Entity('room', { schema: 'room' })
export class Room {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'landlord_id', unsigned: true })
  landlordId: number;

  @Column('smallint', { name: 'monthly_rent', unsigned: true })
  monthlyRent: number;

  @Column('smallint', { name: 'deposit', unsigned: true })
  deposit: number;

  @Column('tinyint', {
    name: 'building_type',
    comment: '1: 단독주택, 2: 오피스텔, 3: 아파트, 4: 빌라',
    unsigned: true,
    default: () => "'0'",
  })
  buildingType: number;

  @Column('tinyint', { name: 'building_floor', unsigned: true })
  buildingFloor: number;

  @Column('tinyint', { name: 'room_floor', unsigned: true })
  roomFloor: number;

  @Column('float', { name: 'room_size', unsigned: true, precision: 12 })
  roomSize: number;

  @Column('varchar', { name: 'move_in_date', length: 128 })
  moveInDate: string;

  @Column('varchar', { name: 'address', length: 128 })
  address: string;

  @Column('timestamp', {
    name: 'post_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  postDate: Date;

  @Column('timestamp', {
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;

  @Column('tinyint', {
    name: 'status',
    comment: '1: 게시, 2: 삭제, 3: 블라인드',
    unsigned: true,
  })
  status: number;

  @OneToMany(() => Image, (image) => image.roomId)
  images: Image[];

  @OneToMany(() => CareService, (careService) => careService.roomId)
  careServices: CareService[];

  @OneToOne(() => Detail, (detail) => detail.roomId)
  detail: Detail;

  @OneToOne(() => Option, (option) => option.roomId)
  option: Option;

  @OneToOne(() => Rule, (rule) => rule.roomId)
  rule: Rule;

  @OneToOne(() => Safety, (safety) => safety.roomId)
  safety: Safety;

  @OneToOne(() => Pet, (pet) => pet.roomId)
  pet: Pet;

  @OneToOne(() => Address, (address) => address.roomId)
  real_address: Address;

  @OneToOne(() => Contract, (contract) => contract.roomId)
  contract: Contract;
}
