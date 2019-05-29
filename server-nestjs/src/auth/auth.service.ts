import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AuthPayload } from './auth.dto';
import { JwtPayload } from '../strategy/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(userData: User): Promise<User> {
    return await this.userService.validateByEmailAndPassword(
      userData.user_name,
      userData.password,
    );
  }

  public async login(user: User): Promise<AuthPayload | { status: number }> {
    return this.validate(user).then(userData => {
      let payload: JwtPayload = { id: userData.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        // expires_in: 3600,
        token: accessToken,
        user: userData,
        //status: 200,
      };
    });
  }
  public async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findById(payload.id);
  }
  public async register(user: User): Promise<AuthPayload> {
    return this.userService.create(user).then(userData => {
      let payload: JwtPayload = { id: userData.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        // expires_in: 3600,
        token: accessToken,
        user: userData,
        //status: 200,
      };
    });
  }
}
