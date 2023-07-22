import type { WithId } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import type { Product } from "$lib/server/mongodb";
import { deletFromCart, loadCartItems } from "$lib/server/cart";

export const load: PageServerLoad = async function ({ locals }) {
  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }

  return { cart };
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    await deletFromCart(locals.currentUser.userId, data.get("productId"));
  },
};
