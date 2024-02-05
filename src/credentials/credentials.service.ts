import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialInput } from './dto/create-credential.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import { VendorsService } from 'src/vendors/vendors.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Vendor } from 'src/vendors/entities/vendors.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential) private repository: Repository<Credential>,
    private vendorService: VendorsService,
  ) {}

  async create(
    createCredentialInput: CreateCredentialInput,
  ): Promise<Credential> {
    const credentials = this.repository.create(createCredentialInput);
    const vendor = await this.vendorService.findByCode(
      createCredentialInput.vendorCode,
    );

    if (!vendor) {
      throw new HttpException(
        `Vendor with code ${createCredentialInput.vendorCode} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    credentials.vendor = vendor;
    credentials.attributes = createCredentialInput.attributes;

    return this.repository.save(credentials);
  }

  findAll(): Promise<Credential[]> {
    return this.repository.find({ relations: ['vendor'] });
  }

  findByVendorCode(vendorCode: string): Promise<Credential> {
    return this.repository.findOne({
      where: { vendor: { code: vendorCode } },
    });
  }

  @OnEvent('vendor.seeded')
  async handleVendorSeededEvent(
    vendor: Vendor,
    repository: Repository<Vendor>,
  ) {
    const credential = await this.create({
      vendorCode: vendor.code,
      attributes: {
        apiUrl: process.env.PHARMACY_API_URL + '/' + vendor.code,
        orders: {
          create: '/orders',
          getAll: '/orders',
          getById: '/orders/:id',
        },
      },
    });
    vendor.credentials = credential;

    repository.save(vendor);

    console.log('Seeded vendor credential');
  }
}
