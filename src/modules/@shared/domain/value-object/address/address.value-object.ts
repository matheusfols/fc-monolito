import ValueObject from "../value-object.interface"
import Notification from "../../notification/notification"
import NotificationError from "../../notification/notification.error"
import AddressValidatorFactory from "../../../factory/address.validator.factory"

export default class Address implements ValueObject {
  _street: string = ""
  _number: string = ""
  _complement: string = ""
  _city: string = ""
  _state: string = ""
  _zipCode: string = ""
  public notification: Notification;

  constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
    this._street = street
    this._number = number
    this._complement = complement
    this._city = city
    this._state = state
    this._zipCode = zipCode
    this.notification = new Notification();

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }

  validate() {
    AddressValidatorFactory.create().validate(this);
  }
}