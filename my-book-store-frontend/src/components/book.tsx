"use client";
import clsx from "clsx";
import Button from "./button";
import { createOrder } from "@/action/order-action";
import { BookOrderModel } from "@/model/book-order-model";
import { useRouter } from "next/navigation";

interface BookProps {
  book: BookOrderModel;
  className?: string;
  onClick?: () => void;
}

export default function Book({ className, onClick, book }: BookProps) {
  const router = useRouter();
  return (
    <div className={clsx("flex flex-row", className)} onClick={onClick}>
      <div className="flex w-full justify-center overflow-hidden">
        {book.name}
      </div>
      <div className="flex w-full justify-center overflow-hidden">
        {book.author}
      </div>
      <div className="flex w-full justify-center overflow-hidden">
        {book.price} $
      </div>
      <Button
        className="flex bg-neutral-300 rounded-xl p-3 text-black justify-center"
        onClick={async () => {
          await createOrder({
            title: book.name,
            price: book.price,
            store: book.store,
          });
          router.push("/order");
        }}
      >
        Purchase
      </Button>
    </div>
  );
}
