import { loadCartItems } from "$lib/server/cart";
import type { WithId } from "mongodb";
import type { LayoutServerLoad } from "./$types";
import type { Product } from "$lib/server/mongodb";

export const load: LayoutServerLoad = async function ({ locals }) {
  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }
  return { cart };
};
