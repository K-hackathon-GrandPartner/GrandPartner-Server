import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractService {
  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }
}
