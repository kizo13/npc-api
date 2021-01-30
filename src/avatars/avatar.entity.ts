import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Avatar {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public blob: string;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  public uploader: User;
}

export default Avatar;
