import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";
import { mockClientInputAdd, mockClientInputNotAdd } from "../mock/client.mock";
import { ProductModel as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import productRouter from "../routes/product";
import { mockProductInputAdd, mockProductInputAdd2 } from "../mock/product.mock";
import catalogRouter from "../routes/catalog";

describe("E2E test for catalog", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/product", productRouter)
  app.use("/catalog", catalogRouter)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      // sync: { force: true },
    })

    sequelize.addModels([ProductModel, StoreCatalogProductModel])
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

  it("should find a catalog", async () => {
    const inputAddProduct = mockProductInputAdd

    const responseProduct = await request(app)
      .post("/product")
      .send(inputAddProduct);

    expect(responseProduct.status).toBe(200);

    const response = await request(app)
      .get(`/catalog/${responseProduct.body.id}`)

    expect(response.status).toBe(200);

  });

  it("should not find a catalog", async () => {
    const inputAddProduct = mockProductInputAdd

    const responseProduct = await request(app)
      .post("/product")
      .send(inputAddProduct);

    expect(responseProduct.status).toBe(200);

    const response = await request(app)
      .get(`/catalog/1`)

    expect(response.status).toBe(500);

  });


  it("should find all catalog", async () => {

    const responseProduct1 = await request(app)
      .post("/product")
      .send(mockProductInputAdd);

    expect(responseProduct1.status).toBe(200);

    const responseProduct2 = await request(app)
      .post("/product")
      .send(mockProductInputAdd2);

    expect(responseProduct2.status).toBe(200);

    const products = [responseProduct1.body, responseProduct2.body]

    const response = await request(app)
      .get(`/catalog`)

    expect(response.status).toBe(200);
    expect(response.body.products[0].id).toBe(responseProduct1.body.id);
    expect(response.body.products[0].name).toBe(responseProduct1.body.name);
    expect(response.body.products[1].id).toBe(responseProduct2.body.id);
    expect(response.body.products[1].name).toBe(responseProduct2.body.name);
    expect(response.status).toBe(200);

  });
});
