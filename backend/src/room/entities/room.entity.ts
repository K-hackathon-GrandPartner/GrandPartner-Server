import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;
}
