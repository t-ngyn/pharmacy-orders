import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';
import HttpService from 'src/services/HttpService';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { VendorsService } from 'src/vendors/vendors.service';
import { Vendor } from 'src/vendors/entities/vendors.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  createOrder,
  createProduct,
  createRepositoryMock,
  createUser,
} from 'src/test/utils';
import PharmacyService from 'src/services/PharmacyService';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let repository: Repository<Order>;
  let userRepository: Repository<User>;
  let productRepository: Repository<Product>;
  let vendorRepository: Repository<Vendor>;

  const repositoryToken: string | CallableFunction = getRepositoryToken(Order);
  const userRepositoryToken: string | CallableFunction =
    getRepositoryToken(User);
  const productRepositoryToken: string | CallableFunction =
    getRepositoryToken(Product);
  const vendorRepositoryToken: string | CallableFunction =
    getRepositoryToken(Vendor);
  beforeEach(async () => {
    jest
      .spyOn(PharmacyService.prototype, 'getPharmacies')
      .mockResolvedValueOnce(new Promise((resolve) => resolve([])));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        UsersService,
        ProductsService,
        VendorsService,
        EventEmitter2,
        {
          provide: repositoryToken,
          useValue: createRepositoryMock(),
        },
        {
          provide: userRepositoryToken,
          useValue: createRepositoryMock(),
        },
        {
          provide: productRepositoryToken,
          useValue: productRepository,
        },
        {
          provide: vendorRepositoryToken,
          useValue: vendorRepository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(repositoryToken);
    userRepository = module.get<Repository<User>>(userRepositoryToken);
    productRepository = module.get<Repository<Product>>(productRepositoryToken);
    vendorRepository = module.get<Repository<Vendor>>(vendorRepositoryToken);
  });

  it('#create', async () => {
    jest.spyOn(HttpService.prototype, 'post').mockResolvedValueOnce(
      new Promise((resolve) =>
        resolve({
          aBCId: 'foobar',
        }),
      ),
    );

    const user = createUser({
      name: 'test',
      email: 'test@example.com',
      address: '123 Fake Street',
      city: 'Fake',
      state: 'State',
      zipcode: '10000',
      country: 'Canada',
    });
    jest
      .spyOn(UsersService.prototype, 'findByEmail')
      .mockResolvedValueOnce(new Promise((resolve) => resolve(user)));

    const product = createProduct({
      name: 'test',
      price: 3.5,
    });
    jest
      .spyOn(ProductsService.prototype, 'findByCodeAndName')
      .mockResolvedValueOnce(new Promise((resolve) => resolve(product)));

    const order = createOrder({
      quantity: 1,
    });

    jest
      .spyOn(repository as Repository<Order>, 'create')
      .mockReturnValueOnce(order);

    jest
      .spyOn(userRepository as Repository<User>, 'create')
      .mockReturnValueOnce(user);

    await ordersService.create({
      email: 'test@example.com',
      vendorCode: 'test',
      productName: 'test',
      quantity: 1,
    });

    expect(order.quantity).toBe(1);
    expect(order.user).toBe(user);
    expect(order.product).toBe(product);
    expect(order.externalId).toBe('foobar');
    expect(repository.save).toHaveBeenCalledWith(order);
  });
});
