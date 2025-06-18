import { GretaBookModel, PeterBookModel } from "@/model/book-model";

export async function getGretaStore() {
  const response = await fetch("http://localhost:3000/api/greta-store", {
    method: "GET",
  });
  const json = await response.json();
  if (response.ok) return json as GretaBookModel[];
}

export async function getPeterStore() {
  const response = await fetch("http://localhost:3000/api/peter-store", {
    method: "GET",
  });
  const json = await response.json();
  if (response.ok) return json as PeterBookModel[];
}
