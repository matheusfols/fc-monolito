import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../migrations/config-migrations/migrator";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import paymentRouter from "../routes/payment";

describe("E2E test for payment", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/payment", paymentRouter)

  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      // sync: { force: true },
    })

    sequelize.addModels([TransactionModel])
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

  it("should create a transaction", async () => {
    const input = {
      orderId: "order-1",
      amount: 100,
    };

    const response = await request(app)
      .post("/payment")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.orderId).toBe(input.orderId);
    expect(response.body.amount).toBe(input.amount);
    expect(response.body.status).toBe("approved");

  });

  it("should create a transaction declined", async () => {
    const input = {
      orderId: "order-1",
      amount: 50,
    };

    const response = await request(app)
      .post("/payment")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.orderId).toBe(input.orderId);
    expect(response.body.amount).toBe(input.amount);
    expect(response.body.status).toBe("declined");

  });

});
