import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contract } from './contract.entity';

@Entity('review', { database: 'room' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @JoinColumn({ name: 'contract_id' })
  @OneToOne(() => Contract, (contract) => contract.review)
  contractId: number;

  @JoinColumn({ name: 'lessee_id' })
  @OneToOne(() => User)
  user: User;

  @Column('int', { name: 'rating', unsigned: true })
  rating: number;

  @Column('varchar', { name: 'content', nullable: true, length: 256 })
  content: string | null;

  @Column('timestamp', {
    name: 'post_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  postDate: Date;

  @Column('timestamp', {
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;

  @Column('tinyint', {
    name: 'status',
    comment: '1: 게시, 2: 삭제, 3: 블라인드',
    unsigned: true,
  })
  status: number;
}
