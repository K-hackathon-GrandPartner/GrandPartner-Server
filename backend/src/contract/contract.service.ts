import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/room/entities/contract.entity';
import { Room } from 'src/room/entities/room.entity';
import { Repository } from 'typeorm';
import { formatCycleType } from './utils/format';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getCheckList(userId: number) {
    const result = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.contract', 'contract')
      .where('contract.lesseeId = :userId', { userId })
      .andWhere('contract.shareStartDate <= :now', { now: new Date() })
      .andWhere('contract.shareEndDate >= :now', { now: new Date() })
      .leftJoinAndSelect('contract.checkLists', 'checkLists')
      .getOne();

    if (!result || !result.contract || !result.contract.checkLists) {
      console.log({});
      return;
    }

    const checkLists = result.contract.checkLists;

    const object = checkLists.reduce((acc, checkList) => {
      const cycleType = formatCycleType(checkList.cycleType);
      acc[cycleType] = acc[cycleType] || [];
      acc[cycleType].push(checkList.content);
      return acc;
    }, {});

    return object;
  }
}
