import { env } from "$env/dynamic/private";
import { MongoClient, ObjectId } from "mongodb";

export type CartItem = {
  _id?: ObjectId;
  productId: string;
};

export type Product = {
  _id: string;
  id: string;
  images: string[];
  name: string;
  price: number;
};

export type Session = {
  _id?: ObjectId;
  expiresAt: number;
  auth0Token: {
    access_token: string;
    id_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
  };
  userId: string;
  email: string;
};

export const client = new MongoClient(env.MONGODB_URI ?? "mongodb://dummy");
export const database = client.db();
