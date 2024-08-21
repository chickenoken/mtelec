"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import CateProject from "@model/CateProject";

export const getAllCateProjNoId = async () => {
  const redis = await getRedisClient();
  const cacheKey = `allCateProjects`;
  let catePro = await redis.get(cacheKey);

  if (catePro) return JSON.parse(catePro);

  await dbConnect();
  catePro = await CateProject.find({}).sort({ cate_id: 1 });
  const result = JSON.parse(JSON.stringify(catePro));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}
