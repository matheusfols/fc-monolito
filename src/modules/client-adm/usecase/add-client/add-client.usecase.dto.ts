import Address from "../../../@shared/domain/value-object/address/address.value-object"


export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  document: string
  address: Address
}

export interface AddClientOutputDto {
  id: string
  name: string
  email: string
  document: string
  address: Address
  createdAt: Date
  updatedAt: Date
}