import { deleteSession } from "$lib/server/session";
import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  const sessionId = cookies.get("svelte_ec_session");
  if (sessionId) {
    await deleteSession(sessionId);
    cookies.delete("svelte_ec_session", { path: "/" });
  }
  throw redirect(302, "/products/react-book");
}
