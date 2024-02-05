import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { VendorsService } from 'src/vendors/vendors.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Vendor } from 'src/vendors/entities/vendors.entity';
import { generateRandomPrice } from 'src/utils';

const PRODUCTS = [
  'Painkiller',
  'Antibiotic',
  'Antihistamine',
  'Antacid',
  'Antibacterial',
  'Cold',
  'Flu',
  'Cough',
  'Corticosteroid',
  'Sedative',
];

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private vendorService: VendorsService,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.repository.create(createProductInput);
    const vendor = await this.vendorService.findByCode(
      createProductInput.vendorCode,
    );

    if (!vendor) {
      throw new HttpException(
        `Vendor with code ${createProductInput.vendorCode} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    product.vendor = vendor;

    return this.repository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['orders'] });
  }

  findByCodeAndName(vendorCode: string, productName: string): Promise<Product> {
    return this.repository.findOne({
      where: { vendor: { code: vendorCode }, name: productName },
    });
  }

  @OnEvent('vendor.seeded')
  handleVendorSeededEvent(vendor: Vendor) {
    PRODUCTS.forEach((product) => {
      this.create({
        name: product,
        price: generateRandomPrice(),
        vendorCode: vendor.code,
      });
    });
    console.log('Seeded products');
  }
}
