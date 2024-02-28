const mockInvoiceInputAdd = {
  name: "Mary Smith",
  document: "1234567890",
  street: "Rua Xv",
  number: "1549",
  complement: "",
  city: "Itararé",
  state: "SP",
  zipCode: "99999-999",
  items: [
    {
      id: "1",
      name: "Product mock 1",
      price: 20,
    }
  ]
}

const mockInvoiceInputNotAdd = {
  name: "Mary Smith",
  document: "1234567890",
  street: "Rua Xv",
  number: "1549",
  complement: "",
  city: "Itararé",
  state: "SP",
  zipCode: "99999-999",
  items: ''
}

export { mockInvoiceInputAdd, mockInvoiceInputNotAdd }