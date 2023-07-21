import { sendPasswordlessLink } from "$lib/server/auth0";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { FORM_ERRORS_LOGIN } from "./const";

export const actions: Actions = {
  default: async ({ cookies, request, url }) => {
    const data = await request.formData();
    const email = (data.get("email") as string) || null; // TODO: better typed

    if (!email) {
      return fail(400, { email, error: FORM_ERRORS_LOGIN.MISSING });
    }

    if (!/^.+@.+$/.test(email)) {
      return fail(400, { email, error: FORM_ERRORS_LOGIN.INVALID_FORMAT });
    }

    const state = crypto.randomUUID();
    const redirectUri = `${url.origin}/api/auth/callback`;
    await sendPasswordlessLink(email, state, redirectUri);

    cookies.set("state", state, { path: "/" });
    return { success: true };
  },
};
