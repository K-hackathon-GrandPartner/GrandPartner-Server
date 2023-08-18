import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("detail", { schema: "room" })
export class Detail {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Column("varchar", { name: "content", nullable: true, length: 500 })
  content: string | null;
}
