import { Link } from './link.entity';

export class Feed {
  links: [Link];
  count: number;
}

export enum typeOfOrderBY {
  description_ASC,
  description_DESC,
  url_ASC,
  url_DESC,
  createdAt_ASC,
  createdAt_DESC,
}
