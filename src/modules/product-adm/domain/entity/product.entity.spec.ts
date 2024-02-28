import Id from "../../../@shared/domain/value-object/id.value-object";
import { mockProducAdmInput1 } from "../../mock/mock";
import Product from "./product.entity";

describe("Product unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      const input = {
        name: "",
        description: "",
        purchasePrice: -1,
        salesPrice: -1,
        stock: -1,
      }
      const product = new Product(input);
    }).toThrowError("product: Name is required,product: Description is required,product: Purchase Price must be greater than zero,product: Sales Price must be greater than zero,product: Stock must be greater than zero");
  });
})