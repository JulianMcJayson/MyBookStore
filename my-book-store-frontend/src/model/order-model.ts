interface IOrderBase {
  title: string;
  price: number;
  store: number;
}

interface IOrder extends IOrderBase {
  id: number;
}

export class OrderModel implements IOrder {
  id: number;
  title: string;
  price: number;
  store: number;

  constructor(order: IOrder) {
    this.id = order.id;
    this.title = order.title;
    this.price = order.price;
    this.store = order.store;
  }
}

export class CreateOrderModel implements IOrderBase {
  title: string;
  price: number;
  store: number;

  constructor(order: IOrder) {
    this.title = order.title;
    this.price = order.price;
    this.store = order.store;
  }
}
