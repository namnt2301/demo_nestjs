import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity('link')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;
  @ManyToOne(type => User, user => user.links, { nullable: false })
  postBy: User;

  @ManyToMany(type => User)
  @JoinTable()
  voteBy: User[];
}

// @Entity('vote')
// export class Vote {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Many()
//   userId: number;
//   @Column()
//   linkId: number;
// }
