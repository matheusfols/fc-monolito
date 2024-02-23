import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import { CheckoutFacadeInputDto } from "../facade/checkout.facade.interface"
import CheckoutRepository from "../repository/checkout.repository"

export const mockCheckoutClient = {
  id: new Id().id,
  name: "John Doe",
  email: "johndoe@gmail.com",
  document: "123456789",
  address: {
    street: "Street 1",
    number: "1",
    complement: "Complement 1",
    city: "Itarare",
    state: "SP",
    zipCode: "88888-88"
  },
  createdAt: new Date(),
  updatedAt: new Date()
}

export const mockCheckoutProduct = {
  productId: new Id().id,
  stock: 10
}

export const mockCheckoutStoreProduct = {
  id: mockCheckoutProduct.productId,
  name: "Product 1",
  description: "Description 1",
  salesPrice: 110
}

export const mockCheckoutOrder = new Order({
  id: new Id(),
  client: new Client({
    id: new Id(mockCheckoutClient.id),
    name: mockCheckoutClient.name,
    email: mockCheckoutClient.email,
    document: mockCheckoutClient.document,
    address: new Address(
      mockCheckoutClient.address.street,
      mockCheckoutClient.address.number,
      mockCheckoutClient.address.complement,
      mockCheckoutClient.address.city,
      mockCheckoutClient.address.state,
      mockCheckoutClient.address.zipCode
    )
  }),
  products: [
    new Product({
      id: new Id(mockCheckoutStoreProduct.id),
      name: mockCheckoutStoreProduct.name,
      description: mockCheckoutStoreProduct.description,
      salesPrice: mockCheckoutStoreProduct.salesPrice
    })
  ],
  status: "approved",
  createdAt: new Date(),
  updatedAt: new Date()
});


export const mockCheckoutInvoice = {
  id: new Id().id,
  name: mockCheckoutClient.name,
  document: mockCheckoutClient.document,
  street: mockCheckoutClient.address.street,
  number: mockCheckoutClient.address.number,
  complement: mockCheckoutClient.address.complement,
  city: mockCheckoutClient.address.city,
  state: mockCheckoutClient.address.state,
  zipCode: mockCheckoutClient.address.zipCode,
  items: [{
    id: mockCheckoutStoreProduct.id,
    name: mockCheckoutStoreProduct.name,
    price: mockCheckoutStoreProduct.salesPrice
  }],
  total: mockCheckoutStoreProduct.salesPrice
}

export const mockCheckoutPayment = {
  transactionId: new Id().id,
  orderId: new Id().id,
  amount: 110,
  status: "approved",
  createdAt: new Date(),
  updatedAt: new Date()
}

export const clientFacadeMock = {
  find: jest.fn().mockReturnValue(mockCheckoutClient),
  add: jest.fn()
}
export const productFacadeMock = {
  checkStock: jest.fn().mockReturnValue(mockCheckoutProduct),
  addProduct: jest.fn()
}
export const storeCatalogFacadeMock = {
  find: jest.fn().mockReturnValue(mockCheckoutStoreProduct),
  findAll: jest.fn()
}
export const checkoutRepository = new CheckoutRepository();
export const invoiceFacadeMock = {
  generate: jest.fn().mockReturnValue(mockCheckoutInvoice),
  find: jest.fn()
}
export const paymentFacadeMock = {
  process: jest.fn().mockReturnValue(mockCheckoutPayment)
}


export const mockCheckoutFacadeInput: CheckoutFacadeInputDto = {
  clientId: mockCheckoutClient.id,
  products: [{
    productId: mockCheckoutStoreProduct.id,
  }]
}