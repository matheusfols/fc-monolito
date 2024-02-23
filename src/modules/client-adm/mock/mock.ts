import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";

export const mockClientAdmInput = {
  id: new Id(),
  name: "Lucian",
  email: "lucian@xpto.com",
  document: "1234-5678",
  address: new Address(
    "Rua 123",
    "99",
    "Casa Verde",
    "Criciúma",
    "SC",
    "88888-888"
  )
}

export const mockClient = new Client(mockClientAdmInput)


export const MockClientAdmRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(mockClient))
  }
}