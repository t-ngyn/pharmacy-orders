import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Credential } from 'src/credentials/entities/credential.entity';

@ObjectType()
@Entity()
export class Vendor {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Index({ unique: true })
  @Column()
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  zipcode: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  fax: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.vendor)
  products: Product[];

  @Field(() => Credential)
  @OneToOne(() => Credential, (credential) => credential.vendor, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  credentials: Credential;
}
