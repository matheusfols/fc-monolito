import { Sequelize } from "sequelize-typescript";
import { join } from "path";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";

import clientRouter from "../routes/client";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import { ProductCheckoutModel } from "../../modules/checkout/repository/product-checkout.model";
import { ProductModel as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import { ClientCheckoutModel } from "../../modules/checkout/repository/client-checkout.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import productRouter from "../routes/product";
import invoiceRouter from "../routes/invoice";
import { mockClientInputAdd } from "../mock/client.mock";
import { mockProductInputAdd } from "../mock/product.mock";
import checkoutRouter from "../routes/checkout";

describe("E2E test for checkout", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/client", clientRouter)
  app.use("/product", productRouter)
  app.use("/checkout", checkoutRouter)
  app.use("/invoice", invoiceRouter)


  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      // sync: { force: true },
    })

    sequelize.addModels(
      [
        ProductModel,
        ClientModel,
        OrderModel,
        ProductCheckoutModel,
        StoreCatalogProductModel,
        ClientCheckoutModel,
        TransactionModel,
        InvoiceModel,
        InvoiceItemsModel,
      ]
    )
    // await sequelize.sync();
    migration = migrator(sequelize)
    await migration.up()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })

  it("should create a checkout", async () => {
    const responseClient = await request(app)
      .post("/client")
      .send(mockClientInputAdd);

    expect(responseClient.status).toBe(200);

    const responseProduct = await request(app)
      .post("/product")
      .send(mockProductInputAdd);

    expect(responseProduct.status).toBe(200);

    const mockCheckoutInput = {
      clientId: responseClient.body.id,
      products: [{
        productId: responseProduct.body.id,
      }]
    }

    const responseCheckout = await request(app)
      .post("/checkout")
      .send(mockCheckoutInput);

    expect(responseCheckout.status).toBe(200);
    expect(responseCheckout.body.id).toBeDefined()
    expect(responseCheckout.body.invoiceId).toBeDefined()
    expect(responseCheckout.body.status).toEqual("approved")
    expect(responseCheckout.body.total).toEqual(mockProductInputAdd.salesPrice)
    expect(responseCheckout.body.products[0].productId).toEqual(mockCheckoutInput.products[0].productId)


    const responseInvoice = await request(app)
      .get(`/invoice/${responseCheckout.body.invoiceId}`)
      .send();

    expect(responseInvoice.status).toBe(200);
    expect(responseInvoice.body.id).toEqual(responseCheckout.body.invoiceId)
    expect(responseInvoice.body.name).toEqual(mockClientInputAdd.name)
    expect(responseInvoice.body.document).toEqual(mockClientInputAdd.document)
    expect(responseInvoice.body.address.street).toEqual(mockClientInputAdd.address.street)
    expect(responseInvoice.body.address.number).toEqual(mockClientInputAdd.address.number)
    expect(responseInvoice.body.address.complement).toEqual(mockClientInputAdd.address.complement)
    expect(responseInvoice.body.address.city).toEqual(mockClientInputAdd.address.city)
    expect(responseInvoice.body.address.state).toEqual(mockClientInputAdd.address.state)
    expect(responseInvoice.body.address.zipCode).toEqual(mockClientInputAdd.address.zipCode)
    expect(responseInvoice.body.items[0].id).toEqual(mockProductInputAdd.id)
    expect(responseInvoice.body.items[0].name).toEqual(mockProductInputAdd.name)
    expect(responseInvoice.body.items[0].price).toEqual(mockProductInputAdd.salesPrice)
    expect(responseInvoice.body.total).toEqual(mockProductInputAdd.salesPrice)


  });
});
