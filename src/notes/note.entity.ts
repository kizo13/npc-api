import Npc from 'src/npcs/npc.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Note {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Npc, { eager: true })
  public npc: Npc;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  public createdBy: User;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  public modifiedBy: User;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public modifiedAt: Date;
}

export default Note;
