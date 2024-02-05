import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CredentialsService } from './credentials.service';
import { Credential } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';

@Resolver(() => Credential)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Mutation(() => Credential)
  createCredential(
    @Args('createCredentialInput') createCredentialInput: CreateCredentialInput,
  ) {
    return this.credentialsService.create(createCredentialInput);
  }

  @Query(() => [Credential], { name: 'credentials' })
  findAll() {
    return this.credentialsService.findAll();
  }
}
