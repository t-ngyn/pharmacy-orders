import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorsResolver, VendorsService],
  exports: [VendorsResolver, VendorsService],
})
export class VendorsModule {}
