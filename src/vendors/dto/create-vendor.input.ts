import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVendorInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;

  @Field()
  country: string;

  @Field()
  fax: string;

  @Field()
  phone: string;
}
