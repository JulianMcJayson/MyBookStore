import { getOrder } from "@/action/order-action";
import OrderClient from "@/client/order-client";
import { OrderModel } from "@/model/order-model";

export default async function page() {
  let orders: OrderModel[] = [];
  try {
    const response = await getOrder();
    if (response) orders = response;
  } catch (e) {
    console.error(e);
  }
  return <OrderClient orders={orders} />;
}
