export interface InvoiceFindUseCaseInputDTO {
  id: string;
}

export interface InvoiceFindUseCaseOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}