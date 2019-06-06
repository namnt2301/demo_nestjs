import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { Link } from './link.entity';
import { User } from '../user/user.entity';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { GqlAuthGuard } from '../guard/gqlauth.guard';
import { UseGuards } from '@nestjs/common';
import { SimpleGuard } from 'src/guard/simple.guard';
import { typeOfOrderBY } from './feed.dto';
// import { User } from './user.entity';
@Resolver()
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}
  @Mutation('createLink')
  @UseGuards(GqlAuthGuard)
  async createLink(
    @Args() link: Link,
    @CurrentUser() user: User,
  ): Promise<any> {
    console.log(link);
    const a = await this.linkService.createLink(link, user);
    return a;
  }

  @Mutation('vote')
  @UseGuards(GqlAuthGuard)
  async createVote(
    @Args('linkId') linkId: number,
    @CurrentUser() user: User,
  ): Promise<any> {
    const a = await this.linkService.createVote(linkId, user);
    return a;
  }

  @Query('feed')
  async getLinks(
    @Args('first') first: number,
    @Args('skip') skip: number,
    @Args('orderBy') orderBy: typeOfOrderBY,
  ): Promise<any> {
    return await this.linkService.getLinks(first, skip, orderBy);
  }
}
