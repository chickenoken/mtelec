"use server";
import getRedisClient from "@db/redis";

export const clearRedisCache = async () => {
  const redis = await getRedisClient();
  await redis.sendCommand(['FLUSHALL']); // Correctly sends the FLUSHALL command
  return { status: 200 };
};
