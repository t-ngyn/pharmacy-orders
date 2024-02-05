import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { Vendor } from 'src/vendors/entities/vendors.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

export type CredentialAttributes = {
  apiUrl: string;
  orders: {
    create: string;
    getAll: string;
    getById: string;
  };
};

@ObjectType()
@Entity()
export class Credential {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => GraphQLJSONObject)
  @Column('json', { nullable: false, default: '{}' })
  attributes: CredentialAttributes;

  @Field(() => Vendor)
  @OneToOne(() => Vendor, (vendor) => vendor.credentials)
  vendor: Vendor;
}
