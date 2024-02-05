# Pharmacy Orders

## Installation

```bash
$ npm install
```

## Setup Environment Variables

Create a `.env` file in the root application directory and add:
`PHARMACY_API_URL={PHARMACY_MOCK_SERVICE_URL}`

Where `{PHARMACY_MOCK_SERVICE_URL}` is the AWS elastic beanstalk URL for the mock service (**with no trailing slash**).

## Run the Application

```bash
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Navigate to: `http://localhost:3000/api/query`.

### Seed Database

Database is automatically seeded when application is run.

The only empty table is `order`.

## Run Tests

```
npm run test
```

## GraphQL

### Create User

```
mutation {
  createUser(createUserInput: {
    name: "test",
    email: "test@example.com",
    address: "123 Fake Street",
    city: "Fake",
    state: "State",
    zipcode: "10000",
    country: "Canada"
  }) {
    id, name, email, address, city, state, zipcode, country
  }
}
```

### Get Users

```
query {
  users {
    name,
    id,
    email,
    orders {
      id,
      quantity,
      product {
        name,
        price
      }
    }
  }
}
```

### Create Vendor

```
mutation {
  createVendor(createVendorInput: {
    code: "abc",
    name: "ABC",
    address: "123 ABC Street",
    city: "City",
    state: "Montana",
    zipcode: "10000",
    country: "Canada",
    fax: "111-111-1111",
    phone: "222-222-2222",
  }) {
    id, code, name, address, city, state, zipcode, country, fax, phone
  }
}
```

### Create Credentials

```
mutation {
  createCredential(createCredentialInput: {
    vendorCode: "abc",
    attributes: {
      apiUrl: "http://pharmacy-mock-service-env.eba-xzj3bbnm.us-east-1.elasticbeanstalk.com/healthmart",
      orders: {
        create: "/orders",
        getAll: "/orders",
        getById: "/orders/:id"
      }
    }
  }) {
    id, attributes
  }
}
```

### Get Credentials

```
query {
  credentials {
    id,
    attributes,
    vendor {
      id,
      code,
      name
    }
  }
}
```

### Get Vendors

```
query {
  vendors {
    id,
    code,
    name,
    address,
    city,
    state,
    zipcode,
    country,
    fax,
    phone,
    credentials {
      attributes
    },
    products {
      id,
      name,
      price
    }
  }
}
```

### Create Product

```
mutation {
  createProduct(createProductInput: {
    name: "shoes",
    price: 20.50,
    vendorCode: "abc"
  }) {
    id, name, price
  }
}
```

### Get Products

```
query {
  products {
    name,
    id,
    price,
    vendor {
      code,
      name
    },
    orders {
      id,
      quantity
    }
  }
}
```

### Create Order

```
mutation {
  createOrder(createOrderInput: {
    vendorCode: "abc",
    email: "test@example.com",
    productName: "shoes",
    quantity: 10
  }) {
    id,
    quantity,
    product {
      id,
      name,
      price,
      vendor {
        id,
        code,
        name,
        address
        credentials {
          attributes
        }
      }
    }
  }
}
```

### Get Orders

```
query {
  orders {
    id,
    quantity,
    externalId,
    product {
      id,
      name,
      price,
      vendor {
        id,
        code,
        name,
        address
        credentials {
          attributes
        }
      }
    }
  }
}
```
