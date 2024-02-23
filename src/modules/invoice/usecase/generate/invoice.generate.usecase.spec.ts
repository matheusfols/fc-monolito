import { MockInvoiceInput, MockInvoiceRepository } from "../../mock/mocks"
import InvoiceGenerateUseCase from "./invoice.generate.usecase"

describe("Generate invoice use case unit tests", () => {

  it("should generate a invoice", async () => {

    const repository = MockInvoiceRepository
    const usecase = new InvoiceGenerateUseCase(repository)

    const input = MockInvoiceInput

    const result = await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.zipCode).toEqual(input.zipCode)
    expect(result.items.length).toEqual(input.items.length)
  })
})