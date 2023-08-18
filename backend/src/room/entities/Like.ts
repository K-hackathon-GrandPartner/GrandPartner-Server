import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("like", { schema: "room" })
export class Like {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("int", { name: "lessee_id", unsigned: true })
  lesseeId: number;
}
