import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('address', { schema: 'room' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.detail)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('varchar', { name: 'address', length: 128 })
  address: string;

  @Column('double', { name: 'lat' })
  lat: number;

  @Column('double', { name: 'lng' })
  lng: number;
}
