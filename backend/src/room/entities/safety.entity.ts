import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('safety', { schema: 'room' })
export class Safety {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.safety)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('tinyint', { name: 'cctv', unsigned: true, default: () => "'0'" })
  cctv: number;

  @Column('tinyint', {
    name: 'fire_extinguisher',
    unsigned: true,
    default: () => "'0'",
  })
  fireExtinguisher: number;

  @Column('tinyint', {
    name: 'first_aid_kit',
    unsigned: true,
    default: () => "'0'",
  })
  firstAidKit: number;

  @Column('tinyint', {
    name: 'fire_alarm',
    unsigned: true,
    default: () => "'0'",
  })
  fireAlarm: number;

  @Column('tinyint', {
    name: 'carbon_monoxide_alarm',
    unsigned: true,
    default: () => "'0'",
  })
  carbonMonoxideAlarm: number;
}
