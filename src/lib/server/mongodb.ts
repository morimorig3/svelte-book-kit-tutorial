import { env } from "$env/dynamic/private";
import { MongoClient, ObjectId } from "mongodb";

export type MongoId = ObjectId | string;

export type CartItem = {
  _id?: MongoId;
  productId: string;
};

export type Product = {
  _id: MongoId;
  id: string;
  images: string[];
  name: string;
  price: number;
};

export type Session = {
  _id?: MongoId;
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
