import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { RoomModule } from 'src/room/room.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RoomModule],
  controllers: [ContractController],
  providers: [ContractService, JwtService],
})
export class ContractModule {}
