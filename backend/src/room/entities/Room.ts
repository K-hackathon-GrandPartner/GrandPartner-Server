import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("room", { schema: "room" })
export class Room {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "landlord_id", unsigned: true })
  landlordId: number;

  @Column("smallint", { name: "monthly_rent", unsigned: true })
  monthlyRent: number;

  @Column("smallint", { name: "deposit", unsigned: true })
  deposit: number;

  @Column("tinyint", {
    name: "building_type",
    comment: "1: 단독주택, 2: 오피스텔, 3: 아파트, 4: 빌라",
    unsigned: true,
    default: () => "'0'",
  })
  buildingType: number;

  @Column("tinyint", { name: "building_floor", unsigned: true })
  buildingFloor: number;

  @Column("tinyint", { name: "room_floor", unsigned: true })
  roomFloor: number;

  @Column("float", { name: "room_size", unsigned: true, precision: 12 })
  roomSize: number;

  @Column("varchar", { name: "move_in_date", length: 128 })
  moveInDate: string;

  @Column("varchar", { name: "address", length: 128 })
  address: string;

  @Column("timestamp", {
    name: "post_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  postDate: Date;

  @Column("timestamp", {
    name: "update_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;

  @Column("tinyint", {
    name: "status",
    comment: "1: 게시, 2: 삭제, 3: 블라인드",
    unsigned: true,
  })
  status: number;
}
