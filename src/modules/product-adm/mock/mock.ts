import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";

export const mockProducAdmInput1 = {
  id: new Id(),
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 10,
  salesPrice: 15,
  stock: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockProducAdmStockInput1 = {
  id: new Id(),
  stock: 10,
};


export const mockProductAdm = new Product(mockProducAdmInput1);

export const MockProductAdmRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(mockProductAdm)),
  };
};