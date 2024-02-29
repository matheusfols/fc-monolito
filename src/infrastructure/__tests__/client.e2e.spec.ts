import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import clientRouter from "../routes/client";
import Id from "../../modules/@shared/domain/value-object/id.value-object";
import { mockClientInputAdd, mockClientInputNotAdd } from "../mock/client.mock";

describe("E2E test for client", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/client", clientRouter)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      // sync: { force: true },
    })

    sequelize.addModels([ClientModel])
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

  it("should add a client", async () => {
    const input = mockClientInputAdd

    const response = await request(app)
      .post("/client")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Carlos Alberto");

  });

  it("should not add a product", async () => {
    const input = mockClientInputNotAdd

    const response = await request(app)
      .post("/client")
      .send(input);


    expect(response.status).toBe(500);
  });

  it("should find a product", async () => {
    const input = mockClientInputAdd

    const response = await request(app)
      .post("/client")
      .send(input);


    expect(response.status).toBe(200);
    expect(response.body.id).toBe(input.id);

    const responseFind = await request(app)
      .get(`/client/${input.id}`)

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.name).toBe("Carlos Alberto");
  });
});
