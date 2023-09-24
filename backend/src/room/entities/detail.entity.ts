import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('detail', { database: 'room' })
export class Detail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.detail)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('varchar', { name: 'title', length: 128 })
  title: string;

  @Column('varchar', { name: 'content', nullable: true, length: 500 })
  content: string | null;
}
