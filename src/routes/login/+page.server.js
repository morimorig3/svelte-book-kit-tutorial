import { sendPasswordlessLink } from "$lib/server/auth0";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, url }) => {
    const data = await request.formData();
    const email = data.get("email");

    console.log(`${url.origin}/api/auth/callback`);

    if (!email) {
      return fail(400, { email, error: "missing" });
    }

    if (!/^.+@.+$/.test(email)) {
      return fail(400, { email, error: "invalid_format" });
    }

    const state = crypto.randomUUID();
    const redirectUri = `${url.origin}/api/auth/callback`;
    await sendPasswordlessLink(email, state, redirectUri);

    cookies.set("state", state, { path: "/" });
    return { success: true };
  },
};
