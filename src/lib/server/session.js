import { database } from "./mongodb";

const expireIn = 30 * 60 * 1000; // 30 minutes

export async function createSession(data) {
  const sessionId = crypto.randomUUID();
  const session = {
    _id: sessionId,
    expiresAt: Date.now() + expireIn,
    ...data,
  };
  await database.collection("sessions").insertOne(session);
  return sessionId;
}
