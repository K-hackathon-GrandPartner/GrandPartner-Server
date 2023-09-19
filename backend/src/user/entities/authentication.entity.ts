import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('authentication', { database: 'member' })
export class Authentication {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => User, (user) => user.authentication)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'cell_phone', length: 128, unique: true })
  cellPhone: string;

  @Column('tinyint', {
    name: 'sex',
    comment: '1: 남, 2: 여, 3: 기타',
    unsigned: true,
  })
  sex: number;

  @Column('varchar', { name: 'birth', length: 128 })
  birth: string;

  @Column('tinyint', {
    name: 'marketing_consent',
    comment: '마케팅 정보 수신 여부 - 0: 거부, 1: 승인',
    unsigned: true,
    default: () => "'0'",
  })
  marketingConsent: number;
}
