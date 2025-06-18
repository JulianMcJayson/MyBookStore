"use client";
import clsx from "clsx";
import Button from "./button";
import { OrderModel } from "@/model/order-model";
import { deleteOrder } from "@/action/order-action";
import { useRouter } from "next/navigation";

interface BookProps {
  order: OrderModel;
  className?: string;
  onClick?: () => void;
}

export default function Order({ className, onClick, order }: BookProps) {
  const router = useRouter();
  return (
    <div className={clsx("flex flex-row ", className)} onClick={onClick}>
      <div className="flex w-full justify-center overflow-hidden">
        {order.title}
      </div>
      <div className="flex w-full justify-center overflow-hidden">
        {order.price} $
      </div>
      <div className="flex w-full justify-center overflow-hidden">
        {order.store == 0 ? "greta" : "peter"} store
      </div>
      <Button
        className="flex bg-neutral-300 rounded-xl p-3 text-black justify-center"
        onClick={async () => {
          await deleteOrder(order.id);
          router.push("/order");
        }}
      >
        Remove
      </Button>
    </div>
  );
}
