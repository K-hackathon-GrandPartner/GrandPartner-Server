import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('care_service', { database: 'room' })
export class CareService {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => Room, (room) => room.careServices)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('varchar', { name: 'content', nullable: true, length: 128 })
  content: string | null;
}
