import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Npc {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public blob: string;

  @Column()
  public gender: string;

  @Column()
  public class: string;

  @Column()
  public age: string;

  @Column()
  public race: string;

  @Column()
  public culture: string;

  @Column()
  uploader_id: number;
}

export default Npc;
