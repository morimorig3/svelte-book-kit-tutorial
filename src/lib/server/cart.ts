import { database, type CartItem, type Product } from "./mongodb";

export async function addToCart(userId, productId) {
  await database.collection("cartItems").insertOne({ userId, productId });
}

export async function loadCartItems(userId) {
  const items = await database
    .collection<CartItem>("cartItems")
    .find({ userId });
  const productIds = await items.map((item) => item.productId).toArray();
  const products = await database
    .collection<Product>("products")
    .find({ _id: { $in: productIds } });
  return await products.toArray();
}
