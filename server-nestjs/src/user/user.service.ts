import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async validateByEmailAndPassword(
    user_name: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        user_name: user_name,
      },
    });
    if (!user || password != user.password) {
      throw new UnauthorizedException('User credentials is invalid');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(user: User): Promise<User> {
    // const checkUser = await this.userRepository.findOne({
    //   where: {
    //     user_name: user.user_name,
    //   },
    // });

    // if (checkUser) {
    //   throw new BadRequestException(`User name is  already taken`);
    // }

    return await this.userRepository.save(user);
  }
}
