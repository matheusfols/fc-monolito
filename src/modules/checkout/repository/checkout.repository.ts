import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { ClientModel } from "./client-checkout.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product-checkout.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {

    await OrderModel.create({
      id: order.id.id,
      client_id: order.client.id.id,
      client: {
        id: order.client.id.id,
        order_id: order.id.id,
        document: order.client.document,
        name: order.client.name,
        email: order.client.email,
        street: order.client.address.street,
        number: order.client.address.number,
        complement: order.client.address.complement,
        city: order.client.address.city,
        state: order.client.address.state,
        zipcode: order.client.address.zipCode,
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt
      },
      products: order.products.map(product => ({
        id: product.id.id,
        order_id: order.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }, {
      include: [{ model: ProductModel }, { model: ClientModel }]
    })
  }

  async findOrder(id: string): Promise<Order> {

    const order = await OrderModel.findOne({ where: { id }, include: ["client", "products"] })

    if (!order) {
      throw new Error("Order not found")
    }

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        document: order.client.document,
        name: order.client.name,
        email: order.client.email,
        address: new Address(
          order.client.street,
          order.client.number,
          order.client.complement,
          order.client.city,
          order.client.state,
          order.client.zipcode
        ),
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt

      }),
      products: order.products.map((product) => new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    })
  }

}