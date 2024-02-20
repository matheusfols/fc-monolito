import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  InvoiceFindFacadeInputDto,
  InvoiceFindFacadeOutputDto,
  InvoiceGenerateFacadeInputDto,
  InvoiceGenerateFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUsecase = usecaseProps.generateUsecase;
  }

  async generate(input: InvoiceGenerateFacadeInputDto): Promise<InvoiceGenerateFacadeOutputDto> {
    return await this._generateUsecase.execute(input);
  }

  async find(input: InvoiceFindFacadeInputDto): Promise<InvoiceFindFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}