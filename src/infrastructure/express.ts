import express, { Express } from "express";
import { join } from "path";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import productRouter from "./routes/product";
import clientRouter from "./routes/client";
import checkoutRouter from "./routes/checkout";
import paymentRouter from "./routes/payment";
import invoiceRouter from "./routes/invoice";
import { OrderModel } from "../modules/checkout/repository/order.model";
import { ProductCheckoutModel } from "../modules/checkout/repository/product-checkout.model";
import { ProductModel as StoreCatalogProductModel } from "../modules/store-catalog/repository/product.model";
import { ClientCheckoutModel } from "../modules/checkout/repository/client-checkout.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../modules/invoice/repository/invoice-items.model";
import { Umzug } from "umzug";
import { migrator } from "../migrations/config-migrations/migrator";


export const app: Express = express();
app.use(express.json());
app.use("/client", clientRouter)
app.use("/product", productRouter)
app.use("/checkout", checkoutRouter)
app.use("/payment", paymentRouter)
app.use("/invoice", invoiceRouter)

export let sequelize: Sequelize;
export let migration: Umzug<any>;

async function setupDb() {

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: join(__dirname, "../database.sqlite"),
    logging: false,
  });
  await sequelize.addModels([
    ProductModel,
    ClientModel,
    OrderModel,
    ProductCheckoutModel,
    StoreCatalogProductModel,
    ClientCheckoutModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemsModel
  ]);
  // await sequelize.sync();
  migration = migrator(sequelize)
  await migration.up()
}
setupDb();
