import { getStore } from "@netlify/blobs";

export default async function handler(req, context) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const store = getStore("hunt-config");
  await store.set("config", JSON.stringify(body));
  return Response.json({ ok: true });
}

export const config = { path: "/api/set-config" };
