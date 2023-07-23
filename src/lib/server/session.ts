import { database, type MongoId, type Session } from "./mongodb";

const expireIn = 30 * 60 * 1000; // 30 minutes

export async function createSession(data: any) {
  const sessionId = crypto.randomUUID();
  const session = {
    _id: sessionId,
    expiresAt: Date.now() + expireIn,
    ...data,
  };
  await database.collection<Session>("sessions").insertOne(session);
  return sessionId;
}

export async function findSession(sessionId?: MongoId) {
  const session = await database
    .collection<Session>("sessions")
    .findOne({ _id: sessionId });
  if (!session) {
    return null;
  }
  if (session.expiresAt < Date.now()) {
    await deleteSession(session._id);
    return null;
  }
  return session;
}

export async function deleteSession(sessionId: MongoId) {
  await database.collection<Session>("sessions").deleteOne({ _id: sessionId });
}
