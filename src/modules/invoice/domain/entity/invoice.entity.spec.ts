import { mockAddress1, mockItems } from "../../mock/mocks";
import Invoice from "./invoice.entity";

describe("Invoice unit tests", () => {
  it("should throw error when amount is zero", () => {
    expect(() => {
      const input = {
        name: "",
        document: "123456789",
        address: mockAddress1,
        items: mockItems,
      }
      const invoice = new Invoice(input);
    }).toThrowError("invoice: Name is required");
  });
})