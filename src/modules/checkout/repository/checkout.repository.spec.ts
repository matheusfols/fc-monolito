import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ClientCheckoutModel } from "./client-checkout.model";
import { ProductCheckoutModel } from "./product-checkout.model";
import CheckoutRepository from "./checkout.repository";
import { mockCheckoutOrder } from "../mock/mock";

describe("Checkout Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, ClientCheckoutModel, ProductCheckoutModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an order", async () => {
    const input = mockCheckoutOrder;

    const checkoutRepository = new CheckoutRepository();

    await checkoutRepository.addOrder(input);

    const orderDb = await OrderModel.findOne({
      where: { id: input.id.id },
      include: ["client", "products"]
    });

    expect(orderDb).toBeDefined();
    expect(orderDb.id).toEqual(input.id.id);
    expect(orderDb.client.id).toEqual(input.client.id.id);
    expect(orderDb.client.name).toEqual(input.client.name);
    expect(orderDb.client.email).toEqual(input.client.email);
    expect(orderDb.client.street).toEqual(input.client.address.street);
    expect(orderDb.products[0].id).toEqual(input.products[0].id.id);
    expect(orderDb.products[0].name).toEqual(input.products[0].name);
    expect(orderDb.products[0].description).toEqual(input.products[0].description);
    expect(orderDb.products[0].salesPrice).toEqual(input.products[0].salesPrice);
    expect(orderDb.status).toEqual(input.status);
    expect(orderDb.createdAt).toStrictEqual(input.createdAt);
    expect(orderDb.updatedAt).toStrictEqual(input.updatedAt);
  });

  it("should find a order", async () => {
    const orderDb = mockCheckoutOrder

    const checkoutRepository = new CheckoutRepository();
    await checkoutRepository.addOrder(orderDb);
    const result = await checkoutRepository.findOrder(orderDb.id.id);

    expect(result).toBeDefined();
    expect(result.id.id).toEqual(orderDb.id.id);
    expect(result.client.id.id).toEqual(orderDb.client.id.id);
    expect(result.client.name).toEqual(orderDb.client.name);
    expect(result.client.email).toEqual(orderDb.client.email);
    expect(result.client.address.street).toEqual(orderDb.client.address.street);
    expect(result.products[0].id.id).toEqual(orderDb.products[0].id.id);
    expect(result.products[0].name).toEqual(orderDb.products[0].name);
    expect(result.products[0].description).toEqual(orderDb.products[0].description)
    expect(result.products[0].salesPrice).toEqual(orderDb.products[0].salesPrice)
    expect(result.status).toEqual(orderDb.status);
    expect(result.createdAt).toStrictEqual(orderDb.createdAt);
    expect(result.updatedAt).toStrictEqual(orderDb.updatedAt);
  })
})