import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field({ nullable: true })
  externalId?: string;

  @Field()
  email: string;

  @Field()
  vendorCode: string;

  @Field()
  productName: string;

  @Field(() => Int)
  quantity: number;
}
