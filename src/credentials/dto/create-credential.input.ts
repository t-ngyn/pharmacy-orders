import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSONObject from 'graphql-type-json';
import { CredentialAttributes } from '../entities/credential.entity';

@InputType()
export class CreateCredentialInput {
  @Field()
  vendorCode: string;

  @Field(() => GraphQLJSONObject)
  attributes: CredentialAttributes;
}
