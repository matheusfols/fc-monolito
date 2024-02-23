import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";

const mockCatalogProductInput1 = {
  id: new Id(),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
}

const mockCatalogProductInput2 = {
  id: new Id(),
  name: "Product 2",
  description: "Description 2",
  salesPrice: 130,
}

const mockProductStoreCatalog1 = new Product(mockCatalogProductInput1);
const mockProductStoreCatalog2 = new Product(mockCatalogProductInput2);


export const MockStoreCatalogRepository = {
  find: jest.fn().mockReturnValue(Promise.resolve(mockProductStoreCatalog1)),
  findAll: jest.fn().mockReturnValue(Promise.resolve([mockProductStoreCatalog1, mockProductStoreCatalog2])),

};