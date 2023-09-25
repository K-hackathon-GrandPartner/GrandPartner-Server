import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contract } from './contract.entity';

@Entity('check_list', { database: 'room' })
export class CheckList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => Contract, (contract) => contract.checkLists)
  @JoinColumn({ name: 'contract_id' })
  contractId: number;

  @Column('tinyint', {
    name: 'cycle_type',
    unsigned: true,
    default: () => "'0'",
  })
  cycleType: number;

  @Column('varchar', { name: 'content', length: 128 })
  content: string;
}
