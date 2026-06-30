import { getStore } from "@netlify/blobs";

export default async function handler(req, context) {
  const store = getStore("hunt-config");
  const config = await store.get("config", { type: "json" });
  return Response.json(config || {});
}

export const config = { path: "/api/get-config" };
