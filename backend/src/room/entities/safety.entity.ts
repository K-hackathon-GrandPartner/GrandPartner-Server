import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("safety", { schema: "room" })
export class Safety {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("tinyint", { name: "cctv", unsigned: true, default: () => "'0'" })
  cctv: number;

  @Column("tinyint", {
    name: "fire_extinguisher",
    unsigned: true,
    default: () => "'0'",
  })
  fireExtinguisher: number;

  @Column("tinyint", {
    name: "first_aid_kit",
    unsigned: true,
    default: () => "'0'",
  })
  firstAidKit: number;

  @Column("tinyint", {
    name: "fire_alarm",
    unsigned: true,
    default: () => "'0'",
  })
  fireAlarm: number;

  @Column("tinyint", {
    name: "carbon_monoxide_alarm",
    unsigned: true,
    default: () => "'0'",
  })
  carbonMonoxideAlarm: number;
}
