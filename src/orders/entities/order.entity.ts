import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  externalId?: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, {
    cascade: true,
    eager: true,
  })
  user: User;

  @Column()
  userId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.orders, {
    cascade: true,
    eager: true,
  })
  product: Product;

  @Column()
  productId: string;
}
