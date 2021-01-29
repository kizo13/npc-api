import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  uploaderId: number;

  @ManyToOne(() => User, { eager: true })
  public uploader: User;
}

export default Npc;
