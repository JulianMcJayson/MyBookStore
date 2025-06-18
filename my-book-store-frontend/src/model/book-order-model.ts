interface IBookOrder {
  id: number;
  name: string;
  author: string;
  price: number;
  store: number;
}
export class BookOrderModel implements IBookOrder {
  id: number;
  name: string;
  author: string;
  price: number;
  store: number;

  constructor(map: IBookOrder) {
    this.id = map.id;
    this.name = map.name;
    this.author = map.author;
    this.price = map.price;
    this.store = map.store;
  }
}
