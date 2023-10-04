import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('rating', { database: 'member' })
export class Rating {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => User, (user) => user.rating)
  @JoinColumn({ name: 'landlord_id' })
  landlordId: number;

  @Column('float', { name: 'rating', unsigned: true })
  rating: number;

  @Column('int', { name: 'review_count', unsigned: true })
  reviewCount: number;
}
