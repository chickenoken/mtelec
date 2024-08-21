"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import CateProject from "@model/CateProject";

export const getAllCateProj = async (data: any) => {
  const redis = await getRedisClient();
  const cacheKey = `cateProjects:${data.cate_id}`;
  let catePro = await redis.get(cacheKey);

  if (catePro) return JSON.parse(catePro);

  await dbConnect();
  catePro = await CateProject.find({ cate_id: data.cate_id });
  const result = JSON.parse(JSON.stringify(catePro));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}

export const delCateProj = async (id: any) => {
  await dbConnect();
  await CateProject.deleteOne({ _id: id });

  const redis = await getRedisClient();
  const keys: string[] = await redis.keys('cateProjects:*');
  keys.forEach(key => redis.del(key));

  return { status: 200 };
}

export const saveCateProj = async (data: any) => {
  await dbConnect();
  let cate = new CateProject();
  cate.cate_id = data.cate_id;
  cate.cate_title = data.cate_title;
  cate.cate_pro_name = data.cate_pro_name;
  cate.location = data.location;
  cate.detail = data.detail;
  await cate.save();

  const redis = await getRedisClient();
  await redis.del(`cateProjects:${data.cate_id}`);

  return { status: 200 };
}

export const updateCateProj = async (data: any) => {
  await dbConnect();
  let cate = await CateProject.findOne({ _id: data._id });
  if (cate) {
    cate.cate_title = data.cate_title;
    cate.cate_pro_name = data.cate_pro_name;
    cate.location = data.location;
    cate.detail = data.detail;
    await cate.save();

    const redis = await getRedisClient();
    await redis.del(`cateProjects:${cate.cate_id}`);
  }

  return { status: 200 };
}
