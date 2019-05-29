import { User } from '../user/user.entity';

export class AuthPayload {
  token: string;
  user: User;
}
