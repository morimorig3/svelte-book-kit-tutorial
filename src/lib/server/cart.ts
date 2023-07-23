import type { ProductID } from "../../types";
import { database, type CartItem, type Product, type MongoId } from "./mongodb";

export async function addToCart(userId: MongoId, productId: ProductID) {
  await database.collection("cartItems").insertOne({ userId, productId });
}

export async function deletFromCart(userId: MongoId, productId: ProductID) {
  await database.collection("cartItems").deleteOne({ userId, productId });
}

export async function loadCartItems(userId: MongoId) {
  const items = await database
    .collection<CartItem>("cartItems")
    .find({ userId });
  const productIds = await items.map((item) => item.productId).toArray();
  const products = await database
    .collection<Product>("products")
    .find({ _id: { $in: productIds } });
  return await products.toArray();
}
