import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { CheckList } from './check_list.entity';
import { Review } from './review.entity';

@Entity('contract', { database: 'room' })
export class Contract {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @OneToOne(() => Room, (room) => room.contract)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column('int', { name: 'landlord_id', unsigned: true })
  landlordId: number;

  @Column('int', { name: 'lessee_id', unsigned: true })
  lesseeId: number;

  @Column('timestamp', {
    name: 'contract_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  contractDate: Date;

  @Column('timestamp', {
    name: 'share_start_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  shareStartDate: Date;

  @Column('timestamp', {
    name: 'share_end_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  shareEndDate: Date;

  @OneToMany(() => CheckList, (checkList) => checkList.contractId)
  checkLists: CheckList[];

  @OneToOne(() => Review, (review) => review.contractId)
  review: Review;
}
