import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import HttpService from 'src/services/HttpService';
import { lowercaseFirstLetter } from 'src/utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    private userService: UsersService,
    private productService: ProductsService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.repository.create(createOrderInput);
    const user = await this.userService.findByEmail(createOrderInput.email);
    if (!user) {
      throw new HttpException(
        `User with email ${createOrderInput.email} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = await this.productService.findByCodeAndName(
      createOrderInput.vendorCode,
      createOrderInput.productName,
    );

    if (!product) {
      throw new HttpException(
        `Vendor with code ${createOrderInput.vendorCode} and product ${createOrderInput.productName} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    order.user = user;
    order.product = product;

    const vendor = product.vendor;
    const attributes = vendor.credentials.attributes;

    const httpService = new HttpService(
      attributes.apiUrl + attributes.orders.create,
    );

    const vendorName = lowercaseFirstLetter(vendor.name.split(' ')[0]);

    const result = await httpService.post({
      [`${vendorName}Product`]: product.name,
      [`${vendorName}Quantity`]: createOrderInput.quantity,
      [`${vendorName}UserData`]: {
        [`${vendorName}ClientName`]: user.name,
        [`${vendorName}ClientAddress`]: user.address,
        [`${vendorName}ClientCity`]: user.city,
        [`${vendorName}ClientState`]: user.state,
        [`${vendorName}ClientZipcode`]: user.zipcode,
        [`${vendorName}ClientCountry`]: user.country,
      },
    });

    order.externalId = result[`${vendorName}Id`];

    return this.repository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.repository.find();
  }
}
