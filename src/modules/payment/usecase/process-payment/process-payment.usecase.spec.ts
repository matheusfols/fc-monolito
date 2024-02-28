import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/entity/transaction";
import { MockPaymentRepository, MockPaymentRepositoryDeclined, mockTransactionApproved, mockTransactionDeclined } from "../../mock/mock";
import ProcessPaymentUseCase from "./process-payment.usecase";


describe("Process payment usecase unit test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockPaymentRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(mockTransactionApproved.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(mockTransactionApproved.createdAt);
    expect(result.updatedAt).toBe(mockTransactionApproved.updatedAt);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = MockPaymentRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: mockTransactionDeclined.orderId,
      amount: mockTransactionDeclined.amount,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(mockTransactionDeclined.id.id);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(mockTransactionDeclined.amount);
    expect(result.orderId).toBe(mockTransactionDeclined.orderId);
    expect(result.createdAt).toBe(mockTransactionDeclined.createdAt);
    expect(result.updatedAt).toBe(mockTransactionDeclined.updatedAt);
  });
});
