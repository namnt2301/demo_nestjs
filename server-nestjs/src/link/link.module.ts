import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.stategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Link]),
    AuthModule,
    UserModule,
  ],
  providers: [LinkService, LinkResolver, JwtStrategy],
})
export class LinkModule {}
