import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

let cachedHandler = null;

async function getHandler() {
  if (!cachedHandler) {
    cachedHandler = toNextJsHandler(await getAuth());
  }
  return cachedHandler;
}

export async function GET(request) {
  return (await getHandler()).GET(request);
}

export async function POST(request) {
  return (await getHandler()).POST(request);
}