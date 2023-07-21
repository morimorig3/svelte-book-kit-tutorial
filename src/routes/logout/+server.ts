import { deleteSession } from "$lib/server/session";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { COOKIE_KEYS } from "../../const";

export const GET: RequestHandler = async function ({ cookies }) {
  const sessionId = cookies.get(COOKIE_KEYS.SESSION);
  if (sessionId) {
    await deleteSession(sessionId);
    cookies.delete(COOKIE_KEYS.SESSION, { path: "/" });
  }
  throw redirect(302, "/products/react-book");
};
