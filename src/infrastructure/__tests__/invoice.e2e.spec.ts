import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items.model";
import invoiceRouter from "../routes/invoice";
import { mockInvoiceInputAdd, mockInvoiceInputNotAdd } from "./mock/invoice.mock";


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

  it("should create a invoice", async () => {
    const input = mockInvoiceInputAdd;

    const response = await request(app)
      .post("/invoice")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe(input.name)
    expect(response.body.document).toBe(input.document)
    expect(response.body.street).toBe(input.street)
    expect(response.body.number).toBe(input.number)
    expect(response.body.complement).toBe(input.complement)
    expect(response.body.city).toBe(input.city)
    expect(response.body.state).toBe(input.state)
    expect(response.body.zipCode).toBe(input.zipCode)
    expect(response.body.items).toEqual(input.items)

  });
  it("should not create a invoice", async () => {
    const input = mockInvoiceInputNotAdd

    const response = await request(app)
      .post("/invoice")
      .send(input);

    expect(response.status).toBe(500);
  });

  it("should find a invoice", async () => {
    const input = mockInvoiceInputAdd

    const response = await request(app)
      .post("/invoice")
      .send(input);

    expect(response.status).toBe(200);

    const responseFind = await request(app)
      .get(`/invoice/${response.body.id}`)
      .send();

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.id).toBe(response.body.id)
  });


});
