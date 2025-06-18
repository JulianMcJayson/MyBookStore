import { getGretaStore, getPeterStore } from "@/action/book-action";
import HomeClient from "@/client/home-client";
import { BookOrderModel } from "@/model/book-order-model";

export default async function Home() {
  const orders: BookOrderModel[] = [];
  try {
    const gretaResponse = await getGretaStore();
    const peterResponse = await getPeterStore();
    if (gretaResponse)
      gretaResponse.forEach((g) =>
        orders.push({
          id: g.id,
          name: g.name,
          author: g.author,
          price: g.price,
          store: 0,
        })
      );
    if (peterResponse)
      peterResponse.forEach((g) =>
        orders.push({
          id: g.id,
          name: g.title,
          author: g.author,
          price: g.price,
          store: 1,
        })
      );
  } catch (e) {
    console.error(e);
  }
  return <HomeClient books={orders} />;
}
