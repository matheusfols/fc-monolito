const mockClientInputAdd = {
  id: "123",
  name: "Carlos Alberto",
  email: "carlosalbeto@teste.com",
  document: "12345678900",
  address: {
    street: "Rua 123",
    number: "99",
    complement: "Casa Verde",
    city: "Itararé",
    state: "SP",
    zipCode: "18460-000",
  }
}

const mockClientInputNotAdd = {
  id: "123",
  name: "",
  email: "carlosalbeto@teste.com",
  document: "12345678900",
  address: {
    street: "Rua 123",
    number: "99",
    complement: "Casa Verde",
    city: "Itararé",
    state: "SP",
    zipCode: "18460-000",
  }
}

export { mockClientInputAdd, mockClientInputNotAdd }