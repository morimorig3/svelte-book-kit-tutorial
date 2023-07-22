import { findSession } from "$lib/server/session";
import type { Handle } from "@sveltejs/kit";
import { COOKIE_KEYS } from "./const";

export const handle: Handle = async function ({ event, resolve }) {
  const sessionId = event.cookies.get(COOKIE_KEYS.SESSION);
  const session = await findSession(sessionId);
  if (session) {
    event.locals.currentUser = session;
  }
  return await resolve(event);
};
