import { Module } from '@nestjs/common';
import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { VendorsModule } from './vendors/vendors.module';
import { OrdersModule } from './orders/orders.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/api/query',
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    VendorsModule,
    CredentialsModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
