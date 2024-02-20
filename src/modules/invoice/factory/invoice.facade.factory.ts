import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceFindUseCase from "../usecase/find/invoice.find.usecase";
import InvoiceGenerateUseCase from "../usecase/generate/invoice.generate.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new InvoiceFindUseCase(repository);
    const generateUsecase = new InvoiceGenerateUseCase(repository);
    const facade = new InvoiceFacade({
      generateUsecase: generateUsecase,
      findUsecase: findUsecase,
    });

    return facade;
  }
}