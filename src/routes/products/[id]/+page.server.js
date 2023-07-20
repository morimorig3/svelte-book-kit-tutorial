import { addToCart, loadCartItems } from "$lib/server/cart";
import { loadProducts } from "$lib/server/product";

async function getProductFromDataBase(productID) {
  const products = await loadProducts();
  return products.find(({ id }) => id === productID);
}

async function getRelatedProductsFromDataBase(productID) {
  const products = await loadProducts();
  return products.filter(({ id }) => id !== productID);
}

export async function load({ locals, params }) {
  const productID = params.id;

  const product = getProductFromDataBase(productID);
  const relatedProducts = getRelatedProductsFromDataBase(productID);

  let cart = [];
  if (locals.currentUser) {
    cart = await loadCartItems(locals.currentUser.userId);
  }
  return { product, relatedProducts, cart };
}

export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    await addToCart(locals.currentUser.userId, data.get("productId"));
  },
};
