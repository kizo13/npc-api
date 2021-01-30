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

  @ManyToOne(() => User)
  public uploader: User;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public modifiedAt: Date;
}

export default Npc;
