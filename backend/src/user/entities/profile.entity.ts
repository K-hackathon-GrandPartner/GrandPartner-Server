import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('profile', { database: 'member' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'image_url', nullable: true, length: 100 })
  imageUrl: string | null;

  @Column('tinyint', {
    name: 'religion',
    comment: '1: 개신교, 2: 불교, 3: 천주교, 4: 없음',
    unsigned: true,
  })
  religion: number;

  @Column('varchar', { name: 'introduction', nullable: true, length: 200 })
  introduction: string | null;

  @Column('timestamp', {
    name: 'join_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  joinDate: Date;

  @Column('timestamp', {
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
