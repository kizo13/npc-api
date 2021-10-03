import Note from 'src/notes/note.entity';
import { User } from 'src/users/user.entity';
import { AgeEnums } from 'src/_shared/enums/age.enums';
import { CultureEnums } from 'src/_shared/enums/culture.enums';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import GenderType from './enums/gender-type.enum';

@Entity()
class Npc {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public blob: string;

  @Column({
    type: 'enum',
    enum: GenderType,
  })
  public gender: GenderType;

  @Column('text', { array: true })
  public class: string[];

  @Column({
    type: 'enum',
    enum: AgeEnums,
  })
  public age: AgeEnums;

  @Column()
  public race: string;

  @Column({
    type: 'enum',
    enum: CultureEnums,
  })
  public culture: CultureEnums;

  @ManyToOne(() => User)
  public uploader: User;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public modifiedAt: Date;

  @OneToMany(() => Note, (note) => note.npc)
  public note: Note;
}

export default Npc;
