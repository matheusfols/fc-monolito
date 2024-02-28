import ValidatorInterface from "../../@shared/domain/validator/validator.interface";
import InvoiceItems from "../domain/entity/invoice-items.entity";
import InvoiceItemsYupValidator from "../domain/validator/invoice-items.yup.validator";

export default class IncoiveItemsValidatorFactory {
  static create(): ValidatorInterface<InvoiceItems> {
    return new InvoiceItemsYupValidator();
  }
}
