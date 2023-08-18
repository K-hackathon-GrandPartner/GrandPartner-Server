import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contract", { schema: "room" })
export class Contract {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("int", { name: "landlord_id", unsigned: true })
  landlordId: number;

  @Column("int", { name: "lessee_id", unsigned: true })
  lesseeId: number;

  @Column("timestamp", {
    name: "contract_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  contractDate: Date;

  @Column("timestamp", {
    name: "share_start_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  shareStartDate: Date;

  @Column("timestamp", {
    name: "share_end_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  shareEndDate: Date;
}
