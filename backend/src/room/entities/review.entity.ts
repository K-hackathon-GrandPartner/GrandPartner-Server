import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review', { database: 'room' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'contract_id', unsigned: true })
  contractId: number;

  @Column('int', { name: 'landlord_id', unsigned: true })
  landlordId: number;

  @Column('int', { name: 'lessee_id', unsigned: true })
  lesseeId: number;

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
