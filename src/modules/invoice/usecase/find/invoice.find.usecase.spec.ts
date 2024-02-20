import { MockInvoiceRepository, mockInvoice1 } from "../../mock/mocks";
import InvoiceFindUseCase from "./invoice.find.usecase";

describe("Find Invoice use case unit tests", () => {
  it("should find a invoice", async () => {
    const InvoiceRepository = MockInvoiceRepository()
    const usecase = new InvoiceFindUseCase(InvoiceRepository);
    const input = { id: mockInvoice1.id.id };
    const result = await usecase.execute(input);

    expect(result.id).toBe(mockInvoice1.id.id);
    expect(result.name).toBe(mockInvoice1.name);
    expect(result.document).toBe(mockInvoice1.document);
    expect(result.items.length).toEqual(mockInvoice1.items.length);
    expect(result.address.street).toBe(mockInvoice1.address.street);
    expect(result.total).toEqual(mockInvoice1.total())
  });

});
