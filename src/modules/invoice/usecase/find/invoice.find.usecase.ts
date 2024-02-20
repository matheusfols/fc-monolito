import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InvoiceFindUseCaseInputDTO, InvoiceFindUseCaseOutputDTO } from "./invoice.find.dto";

export default class InvoiceFindUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: InvoiceFindUseCaseInputDTO): Promise<InvoiceFindUseCaseOutputDTO> {
    const result = await this._invoiceRepository.find(input.id)

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: {
        street: result.address.street,
        number: result.address.number,
        complement: result.address.complement,
        city: result.address.city,
        state: result.address.state,
        zipCode: result.address.zipCode
      },
      items: result.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: result.total(),
      createdAt: result.createdAt
    }
  }
}