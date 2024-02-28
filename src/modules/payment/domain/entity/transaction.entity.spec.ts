import Transaction from "./transaction";


describe("Transaction unit tests", () => {
  it("should throw error when amount is zero", () => {
    expect(() => {
      const input = {
        amount: -1,
        orderId: "1"
      }
      const transaction = new Transaction(input);
    }).toThrowError("transaction: Amount must be greater than zero");
  });
})