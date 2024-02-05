import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), VendorsModule],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
