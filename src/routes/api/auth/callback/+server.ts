import { getProfile, getToken } from "$lib/server/auth0";
import { createSession } from "$lib/server/session";
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async function ({ cookies, url }) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const redirectUri = `${url.origin}/api/auth/callback`;

  const savedState = cookies.get("state");
  cookies.delete("state", { path: "/" });
  if (!state || !savedState || state !== savedState) {
    throw error(400, { message: "state mismatch" });
  }

  const auth0Token = await getToken(code, redirectUri);
  const { sub, email } = await getProfile(auth0Token);

  const sessionId = await createSession({ auth0Token, userId: sub, email });
  cookies.set("svelte_ec_session", sessionId, { path: "/" });

  throw redirect(303, "/products/react-book");
};
