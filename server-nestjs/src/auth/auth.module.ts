import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.stategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey123',
      publicKey: '2',
    }),
    UserModule,
  ],
  //   controllers: [AuthResolver],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
