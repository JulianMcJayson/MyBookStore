"use client";
import Order from "@/components/order";
import { OrderModel } from "@/model/order-model";
import { useEffect, useState } from "react";

interface OrderClientProps {
  orders: OrderModel[];
}

export default function OrderClient({ orders }: OrderClientProps) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let t = 0;
    for (const o of orders) t += o.price;
    setTotal(t);
  }, [orders]);
  return (
    <div className="flex flex-col w-full h-screen font-light text-white overflow-scroll items-center">
      <div className="flex flex-col w-full h-full">
        <a
          href="/"
          className="flex bg-neutral-700 w-full h-10 justify-center hover:opacity-70 duration-300 items-center"
        >
          BackToStore
        </a>
        {orders.length == 0 ? (
          <div className="w-full flex justify-center items-center h-full text-black text-2xl">
            No books found, buy one get one free!!... just kidding.
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          {orders.map((o) => {
            return (
              <div key={o.id.toString()} className=" w-full">
                <Order
                  className="flex h-16 w-full items-center bg-neutral-500 px-5 py-2"
                  order={o}
                />
              </div>
            );
          })}
        </div>
        <div className="text-black flex w-full justify-center items-center text-3xl">
          Total {total} $
        </div>
      </div>
    </div>
  );
}
