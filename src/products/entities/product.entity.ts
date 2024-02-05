import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

import { ObjectType, Field } from '@nestjs/graphql';
import { Vendor } from 'src/vendors/entities/vendors.entity';
import { Order } from 'src/orders/entities/order.entity';

@ObjectType()
@Entity()
@Index(['vendor', 'name'])
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'decimal', scale: 2, precision: 5 })
  price: number;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @Field(() => Vendor)
  @ManyToOne(() => Vendor, (vendor) => vendor.products, {
    cascade: true,
    eager: true,
  })
  vendor: Vendor;

  @Column()
  vendorId: string;
}
