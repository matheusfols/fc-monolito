import Address from "../../@shared/domain/value-object/address/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/entity/invoice-items.entity";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemsModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";



export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    },
      {
        include: [{ model: InvoiceItemsModel }]
      }
    )

    const rs = new Invoice({
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    });

    return rs
  }

  async find(id: string): Promise<Invoice> {
    const findInvoice = await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemsModel] });

    if (!findInvoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    return new Invoice({
      id: new Id(findInvoice.id),
      name: findInvoice.name,
      document: findInvoice.document,
      address: new Address(
        findInvoice.street,
        findInvoice.number,
        findInvoice.complement,
        findInvoice.city,
        findInvoice.state,
        findInvoice.zipCode
      ),
      items: findInvoice.items.map((item) => (new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      }))),
      createdAt: findInvoice.createdAt,
      updatedAt: findInvoice.updatedAt
    });

  }
}