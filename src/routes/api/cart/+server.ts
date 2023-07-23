import { loadCartItems } from "$lib/server/cart";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { Product } from "$lib/server/mongodb";
import type { WithId } from "mongodb";

export const GET: RequestHandler = async function ({ locals }) {
  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }
  return json(cart);
};
