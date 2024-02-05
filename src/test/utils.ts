import { Credential } from 'src/credentials/entities/credential.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Vendor } from 'src/vendors/entities/vendors.entity';
import { Repository } from 'typeorm';

export const createRepositoryMock = () => {
  const repositoryMock = Object.getOwnPropertyNames(
    Repository.prototype,
  ).reduce((acc, property) => {
    acc[property] = jest.fn();
    return acc;
  }, {});
  return repositoryMock;
};

export const createUser = (params) => {
  const user = new User();
  user.name = params.name;
  user.email = params.email;
  user.address = params.address;
  user.city = params.city;
  user.state = params.state;
  user.zipcode = params.zipcode;
  user.country = params.country;
  return user;
};

export const createOrder = (params) => {
  const order = new Order();
  order.quantity = params.quantity;
  return order;
};

export const createProduct = (params) => {
  const product = new Product();
  product.name = params.name;
  product.price = params.price;
  product.vendor = createVendor({
    code: 'abc',
    name: 'ABC',
    address: '123 ABC Street',
    city: 'City',
    state: 'Montana',
    zipcode: '10000',
    country: 'Canada',
    fax: '111-111-1111',
    phone: '222-222-2222',
  });
  return product;
};

export const createVendor = (params) => {
  const vendor = new Vendor();
  vendor.code = params.code;
  vendor.name = params.name;
  vendor.address = params.address;
  vendor.city = params.city;
  vendor.state = params.state;
  vendor.zipcode = params.zipcode;
  vendor.country = params.country;
  vendor.fax = params.fax;
  vendor.phone = params.phone;
  vendor.credentials = createCredential();

  return vendor;
};

export const createCredential = () => {
  const credentials = new Credential();
  credentials.attributes = {
    apiUrl: 'http://example.com/foo',
    orders: {
      create: '/orders',
      getAll: '/orders',
      getById: '/orders/:id',
    },
  };

  return credentials;
};
