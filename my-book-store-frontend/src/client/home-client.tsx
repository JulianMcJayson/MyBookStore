"use client";
import Book from "@/components/book";
import Button from "@/components/button";
import { BookOrderModel } from "@/model/book-order-model";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface HomeClientProps {
  books: BookOrderModel[];
}

export default function HomeClient({ books }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [bookList, setbookList] = useState<BookOrderModel[]>(books);
  const [filterStore, setFilterStore] = useState<number>(-1);

  useEffect(() => {
    switch (filterStore) {
      case 0:
        if (search.length == 0) {
          const gretaFilter = books.filter((b) => b.store == 0);
          setbookList(gretaFilter);
          return;
        }
        const gretaFilter = books.filter(
          (b) => b.name.toLowerCase().includes(search) && b.store == 0
        );
        setbookList(gretaFilter);
        break;
      case 1:
        if (search.length == 0) {
          const gretaFilter = books.filter((b) => b.store == 1);
          setbookList(gretaFilter);
          return;
        }
        const peterFilter = books.filter(
          (b) => b.name.toLowerCase().includes(search) && b.store == 1
        );
        setbookList(peterFilter);
        break;
      case -1:
        if (search.length == 0) {
          setbookList(books);
          return;
        }
        const filter = books.filter((b) =>
          b.name.toLowerCase().includes(search)
        );
        setbookList(filter);
        break;
    }
  }, [filterStore, search, books]);

  function searching(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget.value;
    setSearch(input);
  }

  function onFilterStore(store: number) {
    setFilterStore(store);
  }

  return (
    <div className="flex flex-col items-center w-full h-screen font-light text-white  overflow-scroll">
      <div className="flex flex-col w-full">
        <a
          href="/order"
          className="bg-neutral-700 w-full h-10 justify-center hover:opacity-70 duration-300 items-center flex"
        >
          Order List
        </a>
        <div className="h-10 w-full flex flex-row">
          <input
            placeholder="searching book"
            className="outline-none bg-neutral-600 h-full w-full placeholder:justify-center p-3"
            onChange={searching}
            value={search}
          />
          {/* <Button className="bg-neutral-400 px-3">Search</Button> */}
        </div>
        <div className="flex flex-row w-full">
          <Button
            onClick={() => {
              onFilterStore(0);
            }}
            className={clsx(
              filterStore == 0 ? "opacity-70" : "",
              "bg-neutral-500 w-full hover:opacity-70 duration-300 flex h-10 justify-center items-center"
            )}
          >
            Greta
          </Button>
          <Button
            onClick={() => {
              onFilterStore(1);
            }}
            className={clsx(
              filterStore == 1 ? "opacity-70" : "",
              "bg-neutral-500 w-full hover:opacity-70 duration-300 flex h-10 justify-center items-center"
            )}
          >
            Peter
          </Button>
          <Button
            onClick={() => {
              onFilterStore(-1);
            }}
            className={
              "bg-neutral-400 px-3 hover:opacity-70 duration-300 flex h-10 justify-center items-center"
            }
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-col pt-3 gap-1">
          {bookList.map((b, id) => {
            return (
              <div key={id} className=" w-full h-full">
                <Book
                  className="flex h-16 w-full items-center bg-neutral-500 px-5 py-2"
                  book={b}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
