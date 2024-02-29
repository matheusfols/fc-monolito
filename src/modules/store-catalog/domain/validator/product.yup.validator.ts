import * as yup from "yup";
import Product from "../entity/product.entity";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";


export default class ProductYupValidator
  implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          description: yup.string().required("Description is required"),
          salesPrice: yup.number().positive("Sales Price must be greater than zero").required("Sales Price is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            salesPrice: entity.salesPrice,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
