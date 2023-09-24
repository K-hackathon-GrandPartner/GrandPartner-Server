import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('rule', { database: 'room' })
export class Rule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.rule)
  @JoinColumn([{ name: 'room_id' }])
  roomId: number;

  @Column('tinyint', {
    name: 'curfew',
    comment: '통금시간 - 1~24, 0: 상관없음',
    unsigned: true,
    default: () => "'0'",
  })
  curfew: number;

  @Column('tinyint', { name: 'smoking', unsigned: true, default: () => "'0'" })
  smoking: number;

  @Column('tinyint', { name: 'drinking', unsigned: true, default: () => "'0'" })
  drinking: number;

  @Column('tinyint', {
    name: 'religion',
    comment: '1: 개신교, 2: 불교, 3: 천주교',
    unsigned: true,
    default: () => "'0'",
  })
  religion: number;
}
