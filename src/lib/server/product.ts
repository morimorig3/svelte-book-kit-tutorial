import { database, type Product } from "./mongodb";

export async function loadProducts() {
  const products = await database.collection<Product>("products").find();
  return await products.toArray();
}

export async function getRecommends(baseId) {
  const products = await loadProducts();
  const candidates = products.filter(({ id }) => id !== baseId);
  return randomSelect(candidates, 2);
}

function randomSelect(array, n) {
  const indices = Array.from({ length: array.length }, (_, i) => i);
  indices.sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * n + 1);
  return Array.from({ length: count }, (_, i) => array[indices[i]]);
}
