import { loadCartItems } from "$lib/server/cart";
import { loadProducts } from "$lib/server/product";
import type { WithId } from "mongodb";
import type { ProductID } from "../../../types";
import type { PageServerLoad } from "./$types";
import type { Product } from "$lib/server/mongodb";

export const prerender = true;

async function getProductFromDataBase(productID: ProductID) {
  const products = await loadProducts();
  return products.find(({ id }) => id === productID);
}

async function getRelatedProductsFromDataBase(productID: ProductID) {
  const products = await loadProducts();
  return products.filter(({ id }) => id !== productID);
}

export const load: PageServerLoad = async function ({ locals, params }) {
  const productID = params.id;

  const product = getProductFromDataBase(productID);
  const relatedProducts = getRelatedProductsFromDataBase(productID);

  let cart: WithId<Product>[] = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }

  return { product, relatedProducts, cart };
};
