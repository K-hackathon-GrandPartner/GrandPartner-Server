import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('pet', { database: 'room' })
export class Pet {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.pet)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('tinyint', { name: 'dog', unsigned: true, default: () => "'0'" })
  dog: number;

  @Column('tinyint', { name: 'cat', unsigned: true, default: () => "'0'" })
  cat: number;

  @Column('tinyint', { name: 'etc', unsigned: true, default: () => "'0'" })
  etc: number;
}
