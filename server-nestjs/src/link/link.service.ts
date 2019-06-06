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
    // const query =
    //   'SELECT link.* , user.* FROM link INNER JOIN user ON link.postById = user.id';
    // const linkData: [Link] = await this.linkRepository.query(query);
    // console.log(first);
    // console.log(last);
    // console.log(query);
    // console.log(linkData);
    // const linklist: [Link] = linkData.map(link => {
    //   const newLink = {
    //     id: link.id,
    //     createAt: link.createAt,
    //     description: link.description,
    //     url: link.url,
    //     postBy: {
    //       id: link.postById,
    //       user_name: link.user_name,
    //       password: link.password,
    //     },
    //     voteBy: [{ id: 2, user_name: 'abc', password: 'abc' }],
    //   };
    //   return newLink;
    // });
    const condtion = 'link.id >= ' + first + ' AND link.id <= ' + last + ';';
    console.log(condtion);
    const linklist = await this.linkRepository.find({ where: condtion });
    console.log(linklist);
    const feedData = { links: linklist, count: 1 };
    console.log(feedData);
    return feedData;
  }

  async createVote(linkId, user): Promise<any> {
    const linkData = await this.linkRepository.findOne({
      where: { id: linkId },
    });
    if (!linkData) {
      throw Error('Link is not exist');
    }
    linkData.voteBy.push(user);
    return await this.linkRepository.save(linkData);
  }

  async unVote(linkId, user): Promise<any> {
    const linkData = await this.linkRepository.findOne({
      where: { id: linkId },
    });
    if (!linkData) {
      throw Error('Link is not exist');
    }
    linkData.voteBy.push(user);
    return await this.linkRepository.save(linkData);
  }
}
