import { Injectable } from '@nestjs/common';
import { Link } from './link.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// ßßimport { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Feed, typeOfOrderBY } from './feed.dto';
@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}
  async createLink(link: Link, user: User): Promise<any> {
    // const createLink = await this.userRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Link)
    //   .values({
    //     description: link.description,
    //     url: link.url,
    //     postBy: { id: 1, user_name: 'abc', password: 'abc' },
    //   })
    //   .execute();\
    //console.log(link);
    const linkData = this.linkRepository.create({
      ...link,
      postBy: { ...user },
    });
    return await this.linkRepository.save(linkData);
  }

  async getLinks(
    first: number,
    skip: number,
    orderBy: typeOfOrderBY,
  ): Promise<any> {
    const last = first + skip;
    const query =
      'SELECT link.* , user.* FROM link INNER JOIN user ON link.postById = user.id WHERE link.id BETWEEN ' +
      first +
      ' AND ' +
      last;
    const linkData = await this.linkRepository.query(query);

    const linklist: [Link] = { ...linkData };
    console.log(linklist);
    const feedData = { links: linklist, count: 1 };
    return feedData;
  }
}
