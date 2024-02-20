import Address from "../../@shared/domain/value-object/address"

export interface InvoiceGenerateFacadeInputDto {
  id?: string
  name: string
  document: string,
  street: string,
  number: string,
  complement: string,
  city: string,
  state: string,
  zipCode: string,
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[]
}

export interface InvoiceGenerateFacadeOutputDto {
  id: string
  name: string
  document: string
  street: string,
  number: string,
  complement: string,
  city: string,
  state: string,
  zipCode: string,
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[]
}

export interface InvoiceFindFacadeInputDto {
  id: string
}

export interface InvoiceFindFacadeOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[]
  createdAt: Date
  updatedAt: Date
}

export default interface InvoiceFacadeInterface {
  generate(input: InvoiceGenerateFacadeInputDto): Promise<InvoiceGenerateFacadeOutputDto>;
  find(input: InvoiceFindFacadeInputDto): Promise<InvoiceFindFacadeOutputDto>;
}