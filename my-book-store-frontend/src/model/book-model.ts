interface IGretaBook {
  id: number;
  name: string;
  author: string;
  price: number;
}

interface IPeterBook {
  id: number;
  title: string;
  author: string;
  price: number;
}

export class GretaBookModel implements IGretaBook {
  id: number;
  name: string;
  author: string;
  price: number;
  constructor(book: IGretaBook) {
    this.id = book.id;
    this.name = book.name;
    this.author = book.author;
    this.price = book.price;
  }
}

export class PeterBookModel implements IPeterBook {
  id: number;
  title: string;
  author: string;
  price: number;
  constructor(book: IGretaBook) {
    this.id = book.id;
    this.title = book.name;
    this.author = book.author;
    this.price = book.price;
  }
}
