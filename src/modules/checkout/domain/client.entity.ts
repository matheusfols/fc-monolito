import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id,
  name: string,
  email: string,
  document: string,
  address: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _document: string;
  private _address: Address;
  static Address: any;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._email = props.email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get address(): Address {
    return this._address;
  }
  get document(): string {
    return this._document;
  }
}
