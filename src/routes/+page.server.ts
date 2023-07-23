import { loadProducts } from "$lib/server/product";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = async function () {
  const products = await loadProducts();
  return { products };
};
