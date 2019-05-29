import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
//import { AuthPayload } from './auth.dto';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation('login')
  async login(@Args() user: User): Promise<any> {
    const result = this.authService.login(user);
    return result;
  }

  @Mutation('signup')
  async signup(@Args() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
