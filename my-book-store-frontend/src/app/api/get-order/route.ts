export async function GET() {
  const response = await fetch("http://localhost:5254/", {
    method: "GET",
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
