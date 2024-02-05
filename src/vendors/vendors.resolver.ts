import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VendorsService } from './vendors.service';
import { Vendor } from './entities/vendors.entity';
import { CreateVendorInput } from './dto/create-vendor.input';

@Resolver(() => Vendor)
export class VendorsResolver {
  constructor(private readonly vendorsService: VendorsService) {}

  @Mutation(() => Vendor)
  createVendor(
    @Args('createVendorInput') createVendorInput: CreateVendorInput,
  ) {
    return this.vendorsService.create(createVendorInput);
  }

  @Query(() => [Vendor], { name: 'vendors' })
  findAll() {
    return this.vendorsService.findAll();
  }
}
