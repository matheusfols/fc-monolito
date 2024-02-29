import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { CheckoutFacadeInputDto, CheckoutFacadeOututDto } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrder: UseCaseInterface;

  constructor(placeOrderUseCase: UseCaseInterface) {
    this._placeOrder = placeOrderUseCase;
  }

  async checkout(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOututDto> {
    return await this._placeOrder.execute(input);
  }
}