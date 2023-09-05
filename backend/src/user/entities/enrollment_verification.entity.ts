import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('enrollment_verification', { schema: 'member' })
export class EnrollmentVerification {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => User, (user) => user.enrollmentVerification)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'university', length: 128 })
  university: string;

  @Column('varchar', { name: 'image_url', length: 100 })
  imageUrl: string;
}
