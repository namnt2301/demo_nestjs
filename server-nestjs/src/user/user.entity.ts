import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Link } from '../link/link.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  user_name: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @OneToMany(type => Link, link => link.postBy)
  links: Link[];

  @ManyToMany(type => Link, link => link.voteBy)
  voteLinks: Link[];

  // @ManyToMany(type => Link, link => link.voteBy)
  // voteLinks: Link[];
}
