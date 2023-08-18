import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("care_service", { schema: "room" })
export class CareService {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("varchar", { name: "content", nullable: true, length: 128 })
  content: string | null;
}
