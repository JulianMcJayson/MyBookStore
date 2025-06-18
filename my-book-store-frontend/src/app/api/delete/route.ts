import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams;
  const id = searchParam.get("id");
  const response = await fetch(`http://localhost:5254/${id}`, {
    method: "DELETE",
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
