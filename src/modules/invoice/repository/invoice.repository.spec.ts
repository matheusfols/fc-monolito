import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.model";
import { mockInvoice1 } from "../mock/mocks";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const invoice = mockInvoice1

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const findInvoice = await InvoiceModel.findOne({ where: { id: invoice.id.id }, include: [InvoiceItemsModel] });

    expect(findInvoice.id).toBe(invoice.id.id);
    expect(findInvoice.name).toBe(invoice.name);
    expect(findInvoice.document).toBe(invoice.document);
    expect(findInvoice.items[0].id).toEqual(invoice.items[0].id.id);
    expect(findInvoice.items[1].id).toEqual(invoice.items[1].id.id);
    expect(findInvoice.street).toBe(invoice.address.street);
  });

  it("should find a invoice", async () => {
    const invoice = mockInvoice1

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const findInvoice = await repository.find(invoice.id.id);

    expect(findInvoice.id.id).toBe(invoice.id.id);
    expect(findInvoice.name).toBe(invoice.name);
    expect(findInvoice.document).toBe(invoice.document);
    expect(findInvoice.items[0].id).toEqual(invoice.items[0].id);
    expect(findInvoice.items[1].id).toEqual(invoice.items[1].id);
    expect(findInvoice.address.street).toBe(invoice.address.street);
  });
});
