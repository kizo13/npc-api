import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Name {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public culture: string;

  @Column()
  public males: string;

  @Column()
  public females: string;

  @Column()
  public surnames: string;
}

export default Name;
