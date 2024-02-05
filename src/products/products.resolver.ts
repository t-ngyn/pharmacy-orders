import {
  Parent,
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    if (createProductInput.price < 0) {
      throw new HttpException(
        `Price must be greater than zero`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @ResolveField('price')
  getPrice(@Parent() product: Product): string {
    return Number(product.price).toFixed(2);
  }
}
