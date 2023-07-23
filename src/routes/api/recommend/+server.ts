import { getRecommends } from "$lib/server/product";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { ProductID } from "../../../types";

export const GET: RequestHandler = async function ({ url }) {
  const recommends = await getRecommends(
    url.searchParams.get("id") as ProductID,
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return json(recommends);
};
