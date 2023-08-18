import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("image", { schema: "room" })
export class Image {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "room_id", unsigned: true })
  roomId: number;

  @Column("int", {
    name: "thumbnail",
    comment: "0: 일반, 1: 썸네일",
    unsigned: true,
  })
  thumbnail: number;

  @Column("varchar", { name: "image_url", length: 100 })
  imageUrl: string;
}
