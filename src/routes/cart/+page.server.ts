import type { WithId } from "mongodb";
import type { PageServerLoad } from "./$types";
import type { Product } from "$lib/server/mongodb";
import { loadCartItems } from "$lib/server/cart";

export const load: PageServerLoad = async function ({ locals }) {
  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }

  return { cart };
};
