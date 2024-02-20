import Id from "../../../@shared/domain/value-object/id.value-object";

export interface PlaceOrderInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface PlaceOrderOutputDto {
  id: Id;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}