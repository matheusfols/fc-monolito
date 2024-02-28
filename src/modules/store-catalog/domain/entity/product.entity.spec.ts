import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

describe("Product unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      const input = {
        name: "",
        description: "",
        salesPrice: -1,
      }
      const product = new Product(input);
    }).toThrowError("product: Name is required,product: Description is required,product: Sales Price must be greater than zero");
  });
})