import type { WithId } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import type { Product } from "$lib/server/mongodb";
import { addToCart, deletFromCart, loadCartItems } from "$lib/server/cart";
import type { ProductID } from "../../types";

export const load: PageServerLoad = async function ({ locals }) {
  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }

  return { cart };
};

export const actions: Actions = {
  remove: async ({ locals, request }) => {
    if (locals.currentUser) {
      console.log("deleted?");
      const data = await request.formData();
      await deletFromCart(
        locals.currentUser.userId,
        data.get("productId") as ProductID,
      );
    }
  },
  add: async ({ locals, request }) => {
    if (locals.currentUser) {
      const data = await request.formData();
      await addToCart(
        locals.currentUser.userId,
        data.get("productId") as ProductID,
      );
    }
  },
};
