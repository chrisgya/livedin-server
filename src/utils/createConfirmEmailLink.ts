import { v4 } from "uuid";
import { Redis } from "ioredis";

// => https://my-site.com/confirm/<id>
export const createConfirmEmailLink = async (
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(id, userId, "ex", 60 * 60 * 24); // expire in 24hours
  return `${process.env.FRONTEND_HOST}/confirm/${id}`;
};
