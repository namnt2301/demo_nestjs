import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LinkModule } from './link/link.module';
import * as path from 'path';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'grapql_demo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: [path.join(__dirname, '..', 'src', './**/*.graphql')],
      context: ({ req }) => ({ req }),
      resolvers: {
        DateTime: GraphQLDateTime,
        Date: GraphQLDate,
        Time: GraphQLTime,
      },
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      // },
    }),
    AuthModule,
    LinkModule,
    // UserModule,
  ],
})
export class AppModule {}
