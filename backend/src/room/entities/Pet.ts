import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pet", { schema: "room" })
export class Pet {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("tinyint", { name: "dog", unsigned: true, default: () => "'0'" })
  dog: number;

  @Column("tinyint", { name: "cat", unsigned: true, default: () => "'0'" })
  cat: number;

  @Column("tinyint", { name: "etc", unsigned: true, default: () => "'0'" })
  etc: number;
}
