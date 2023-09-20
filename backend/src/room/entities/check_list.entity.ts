import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contract } from './contract.entity';

@Entity('check_list', { schema: 'room' })
export class CheckList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => Contract, (contract) => contract.checkLists)
  @JoinColumn({ name: 'contract_id' })
  contractId: number;
}