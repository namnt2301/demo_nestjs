import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SimpleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const authorizationHeader =
      request.headers && request.headers.authorization
        ? request.headers.authorization.split(' ')[1]
        : null;
    if (authorizationHeader) {
      const userData = this.jwtService.verify(authorizationHeader);
      console.log(userData);
      const user = await this.userService.findById(userData.id);
      request.user = user;
    }
    return true;
  }
}
