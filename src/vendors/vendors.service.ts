import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PharmacyService from 'src/services/PharmacyService';
import { CreateVendorInput } from './dto/create-vendor.input';
import { Vendor } from './entities/vendors.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor) private repository: Repository<Vendor>,
    private eventEmitter: EventEmitter2,
  ) {
    this.seed();
  }

  async seed() {
    const service = new PharmacyService(process.env.PHARMACY_API_URL);
    const results = await service.getPharmacies();

    for (const {
      integrationName,
      name,
      address,
      city,
      state,
      zipcode,
      country,
      fax,
      phone,
    } of results) {
      const result = await this.create({
        code: integrationName,
        name,
        address,
        city,
        state,
        zipcode,
        country,
        fax,
        phone,
      });
      this.eventEmitter.emit('vendor.seeded', result, this.repository);
    }

    console.log('Seeded vendors');
  }

  async create(createVendorInput: CreateVendorInput): Promise<Vendor> {
    const vendor = this.repository.create(createVendorInput);
    return this.repository.save(vendor);
  }

  findAll(): Promise<Vendor[]> {
    return this.repository.find({ relations: ['products'] });
  }

  findByCode(code: string): Promise<Vendor> {
    return this.repository.findOne({ where: { code } });
  }
}
