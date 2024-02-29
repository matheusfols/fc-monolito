import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import invoiceRouter from "../routes/invoice";
import { mockInvoiceInputAdd, mockInvoiceInputNotAdd } from "../mock/invoice.mock";


describe("E2E test for invoice", () => {
  const app: Express = express()
  app.use(express.json())
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

    sequelize.addModels([InvoiceModel, InvoiceItemsModel])
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


  it("should find a invoice", async () => {
    const input = mockInvoiceInputAdd

    await InvoiceModel.create(input, { include: [{ model: InvoiceItemsModel }] });

    const responseFind = await request(app)
      .get(`/invoice/${input.id}`)
      .send();

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.id).toBe(input.id)
  });

  it("should not find a invoice", async () => {
    const input = mockInvoiceInputAdd

    await InvoiceModel.create(input, { include: [{ model: InvoiceItemsModel }] });

    const responseFind = await request(app)
      .get(`/invoice/${input.id}s`)
      .send();

    expect(responseFind.status).toBe(500);

  });


});
