import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('option', { database: 'room' })
export class Option {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.option)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('tinyint', { name: 'bathroom', unsigned: true, default: () => "'0'" })
  bathroom: number;

  @Column('tinyint', { name: 'bed', unsigned: true, default: () => "'0'" })
  bed: number;

  @Column('tinyint', {
    name: 'air_conditioner',
    unsigned: true,
    default: () => "'0'",
  })
  airConditioner: number;

  @Column('tinyint', { name: 'desk', unsigned: true, default: () => "'0'" })
  desk: number;

  @Column('tinyint', {
    name: 'free_parking',
    unsigned: true,
    default: () => "'0'",
  })
  freeParking: number;

  @Column('tinyint', { name: 'wifi', unsigned: true, default: () => "'0'" })
  wifi: number;

  @Column('tinyint', { name: 'kitchen', unsigned: true, default: () => "'0'" })
  kitchen: number;

  @Column('tinyint', { name: 'washer', unsigned: true, default: () => "'0'" })
  washer: number;

  @Column('tinyint', { name: 'elevator', unsigned: true, default: () => "'0'" })
  elevator: number;

  @Column('tinyint', {
    name: 'paid_parking',
    unsigned: true,
    default: () => "'0'",
  })
  paidParking: number;

  @Column('tinyint', { name: 'closet', unsigned: true, default: () => "'0'" })
  closet: number;

  @Column('tinyint', { name: 'tv', unsigned: true, default: () => "'0'" })
  tv: number;
}
