import Address from "../../@shared/domain/value-object/address/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/entity/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {

  async add(entity: Client): Promise<void> {
    try {
      const values = {
        id: entity.id.id,
        name: entity.name,
        email: entity.email,
        document: entity.document,
        street: entity.address.street,
        number: entity.address.number,
        complement: entity.address.complement,
        city: entity.address.city,
        state: entity.address.state,
        zipCode: entity.address.zipCode,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }

      await ClientModel.create(values)
    } catch (error) {
      throw new Error("Error to add client")
    }

  }

  async find(id: string): Promise<Client> {

    const client = await ClientModel.findOne({ where: { id: id } })


    if (!client) {
      throw new Error("Client not found")
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipCode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt
    })
  }
}