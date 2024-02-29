import Transaction from "../domain/entity/transaction";

export default interface PaymentGateway {
  save(input: Transaction): Promise<Transaction>;
}
