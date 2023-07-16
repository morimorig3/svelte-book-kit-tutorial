import * as dotenv from "dotenv";
import { readFile } from "fs/promises";
import { MongoClient } from "mongodb";

dotenv.config();

async function readJSON(filename) {
  const content = await readFile(filename, { encoding: "utf-8" });
  return JSON.parse(content);
}

async function main() {
  const key = process.env.MONGODB_URI;
  console.log(key);
  const client = new MongoClient(key);
  const database = client.db();

  const productData = await readJSON("data/products.json");
  for (const product of productData) {
    console.log(`Seed products/${product.id}`);
    await database.collection("products").updateOne(
      {
        _id: product.id,
      },
      {
        $set: {
          ...product,
          _id: product.id,
        },
      },
      {
        upsert: true,
      }
    );
  }

  await client.close();
}

main();
