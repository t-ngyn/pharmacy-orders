import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

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

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
