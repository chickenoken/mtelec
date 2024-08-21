"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import News from "@model/News";

export const getNewById = async (id: any) => {
  const redis = await getRedisClient();
  const cacheKey = `news:${id}`;
  let ne = await redis.get(cacheKey);

  if (ne) return JSON.parse(ne);

  await dbConnect();
  ne = await News.findOne({ _id: id });
  const result = JSON.parse(JSON.stringify(ne));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}

export const saveNew = async (data: any) => {
  await dbConnect();
  let ne = new News();
  ne.title = data.title;
  ne.content = data.content;
  ne.type = data.type;
  ne.dateUp = data.dateUp;
  await ne.save();

  // Clear relevant cache after saving
  const redis = await getRedisClient();
  await redis.del('newMain');
  await redis.del('newOther');

  return { status: 200 };
}

export const updateNew = async (data: any) => {
  await dbConnect();
  let ne = await News.findOne({ _id: data._id });
  if (ne) {
    ne.title = data.title;
    ne.content = data.content;
    ne.type = data.type;
    ne.dateUp = data.dateUp;
    await ne.save();

    // Clear relevant cache after updating
    const redis = await getRedisClient();
    await redis.del(`news:${data._id}`);
    await redis.del('newMain');
    await redis.del('newOther');
  }

  return { status: 200 };
}