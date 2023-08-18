import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rule", { schema: "room" })
export class Rule {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("tinyint", {
    name: "curfew",
    comment: "통금시간 - 1~24, 0: 상관없음",
    unsigned: true,
    default: () => "'0'",
  })
  curfew: number;

  @Column("tinyint", { name: "smoking", unsigned: true, default: () => "'0'" })
  smoking: number;

  @Column("tinyint", { name: "drinking", unsigned: true, default: () => "'0'" })
  drinking: number;

  @Column("tinyint", {
    name: "religion",
    comment: "1: 개신교, 2: 불교, 3: 천주교",
    unsigned: true,
    default: () => "'0'",
  })
  religion: number;
}
