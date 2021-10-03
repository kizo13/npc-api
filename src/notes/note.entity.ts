import Npc from 'src/npcs/npc.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  public createdBy: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  public modifiedBy: User;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public modifiedAt: Date;

  @Column({ default: false })
  public isPrivate: boolean;
}

export default Note;
