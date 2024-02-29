
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/entity/transaction";

export const mockTransaction = new Transaction({
  id: new Id(),
  amount: 100,
  orderId: "1"
});

export const mockTransactionApproved = new Transaction({
  id: new Id(),
  amount: 100,
  orderId: "1",
  status: "approved",
  createdAt: new Date(),
  updatedAt: new Date()
});

export const mockTransactionDeclined = new Transaction({
  id: new Id(),
  amount: 30,
  orderId: "1",
  status: "declined",
  createdAt: new Date(),
  updatedAt: new Date()
});

export const MockPaymentRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(mockTransactionApproved)),
  };
};

export const MockPaymentRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(mockTransactionDeclined)),
  };
}

export const MockPaymentFacade = () => {
  return {
    process: jest.fn().mockReturnValue(Promise.resolve(mockTransaction)),
  };
};