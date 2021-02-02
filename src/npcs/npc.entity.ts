import { User } from 'src/users/user.entity';
import { AgeEnums } from 'src/_shared/enums/age.enums';
import { CultureEnums } from 'src/_shared/enums/culture.enums';
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

  @Column({
    type: 'enum',
    enum: AgeEnums,
  })
  public age: string;

  @Column()
  public race: string;

  @Column({
    type: 'enum',
    enum: CultureEnums,
  })
  public culture: string;

  @ManyToOne(() => User)
  public uploader: User;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public modifiedAt: Date;
}

export default Npc;
