import { Sequelize } from "sequelize-typescript"
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase"
import CheckoutFacade from "./checkout.facade"
import { OrderModel } from "../repository/order.model"
import { ClientCheckoutModel } from "../repository/client-checkout.model"
import { ProductCheckoutModel } from "../repository/product-checkout.model"
import { checkoutRepository, clientFacadeMock, invoiceFacadeMock, mockCheckoutClient, mockCheckoutFacadeInput, mockCheckoutPayment, mockCheckoutStoreProduct, paymentFacadeMock, productFacadeMock, storeCatalogFacadeMock } from "../mock/mock"
import { mockTransaction } from "../../payment/mock/mock"

describe("Checkout facade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([OrderModel, ClientCheckoutModel, ProductCheckoutModel]);
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate a order", async () => {

    const placeOrderUseCase = new PlaceOrderUseCase(
      clientFacadeMock,
      productFacadeMock,
      storeCatalogFacadeMock,
      checkoutRepository,
      invoiceFacadeMock,
      paymentFacadeMock
    );

    const facade = new CheckoutFacade(placeOrderUseCase);

    await facade.checkout(mockCheckoutFacadeInput)


    const result = await OrderModel.findAll({ include: ["client", "products"] })

    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    expect(result[0].id).toBeDefined()
    expect(result[0].client.id).toEqual(mockCheckoutClient.id)
    expect(result[0].client.name).toEqual(mockCheckoutClient.name)
    expect(result[0].client.email).toEqual(mockCheckoutClient.email)
    expect(result[0].client.street).toEqual(mockCheckoutClient.address.street)
    expect(result[0].products[0].id).toEqual(mockCheckoutStoreProduct.id)
    expect(result[0].products[0].name).toEqual(mockCheckoutStoreProduct.name)
    expect(result[0].products[0].description).toEqual(mockCheckoutStoreProduct.description)
    expect(result[0].products[0].salesPrice).toEqual(mockCheckoutStoreProduct.salesPrice)
    expect(result[0].status).toEqual(mockCheckoutPayment.status)
    expect(result[0].createdAt).toBeDefined()
    expect(result[0].updatedAt).toBeDefined()
  })
})