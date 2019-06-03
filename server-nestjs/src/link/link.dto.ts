import { User } from '../user/user.entity';

export class Link {
  id: number;
  createAt: string;
  description: string;
  url: string;
  postBy: User;
  voteBy: User;
}
