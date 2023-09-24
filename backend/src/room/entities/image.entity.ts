import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('image', { database: 'room' })
export class Image {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => Room, (room) => room.images)
  @JoinColumn({ name: 'room_id' })
  roomId: Room;

  @Column('int', {
    name: 'thumbnail',
    comment: '0: 일반, 1: 썸네일',
    unsigned: true,
  })
  thumbnail: number;

  @Column('text', { name: 'image_url' })
  imageUrl: string;
}
