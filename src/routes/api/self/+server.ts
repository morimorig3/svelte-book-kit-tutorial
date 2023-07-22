import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async function ({ locals }) {
  if (!locals.currentUser) {
    return json(null);
  }
  return json({ email: locals.currentUser.email });
};
