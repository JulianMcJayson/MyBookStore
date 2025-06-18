import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const response = await fetch(`http://localhost:5254/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: await request.text(),
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
