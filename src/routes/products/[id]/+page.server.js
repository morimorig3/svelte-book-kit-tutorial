import { addToCart, loadCart } from "$lib/server/cart";
import { loadProducts } from "$lib/server/product";

async function getProductFromDataBase(productID) {
  const products = await loadProducts();
  return products.find(({ id }) => id === productID);
}

async function getRelatedProductsFromDataBase(productID) {
  const products = await loadProducts();
  return products.filter(({ id }) => id !== productID);
}

export async function load({ params }) {
  const productID = params.id;

  const product = getProductFromDataBase(productID);
  const relatedProducts = getRelatedProductsFromDataBase(productID);
  const cart = await loadCart();
  return { product, relatedProducts, cart };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    await addToCart(data.get("productId"));
  },
};
