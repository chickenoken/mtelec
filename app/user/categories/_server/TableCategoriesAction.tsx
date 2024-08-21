"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import CateProject from "@model/CateProject";
import Categories from "@model/Categories";

export const getAllCate = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'categories:all';
  let cate = await redis.get(cacheKey);

  if (cate) return JSON.parse(cate);

  await dbConnect();
  cate = await Categories.find();
  for (let i = 0; i < cate.length; i++) {
    const item = cate[i];
    let catePrj = await CateProject.find({ cate_id: item._id });
    item.project_detail_num = catePrj.length;
  }

  const result = JSON.parse(JSON.stringify(cate));
  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}

export const delCate = async (id: any) => {
  await dbConnect();
  await Categories.deleteOne({ _id: id });
  await CateProject.deleteMany({ cate_id: id });

  const redis = await getRedisClient();
  await redis.del('categories:all');

  return { status: 200 };
}
