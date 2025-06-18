import { CreateOrderModel, OrderModel } from "@/model/order-model";

export async function createOrder(order: CreateOrderModel) {
  const response = await fetch("/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
  }
}

export async function getOrder() {
  const response = await fetch("http://localhost:3000/api/get-order", {
    method: "GET",
  });
  const json = await response.json();
  if (response.ok) return json as OrderModel[];
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
  }
}

export async function deleteOrder(id: number) {
  const response = await fetch(`/api/delete?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
  }
}
