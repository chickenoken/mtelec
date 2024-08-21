"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import NewFile from "@model/NewFile";

export const getAllNewFile = async (data: any) => {
  const redis = await getRedisClient();
  const cacheKey = `newFiles:${data.id_news}`;
  let nf = await redis.get(cacheKey);

  if (nf) return JSON.parse(nf);

  await dbConnect();
  nf = await NewFile.find({ id_news: data.id_news });
  const result = JSON.parse(JSON.stringify(nf));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}

export const delNewFile = async (id: any) => {
  await dbConnect();
  await NewFile.deleteOne({ _id: id });

  // Clear relevant cache after deletion
  const redis = await getRedisClient();
  const keys: string[] = await redis.keys('newFiles:*'); // Explicitly type 'keys' as string array
  keys.forEach(key => redis.del(key));

  return { status: 200 };
}

export const saveNewFile = async (data: any) => {
  await dbConnect();
  let nf = new NewFile();
  nf.id_news = data.id_news;
  nf.file = data.file;
  nf.file_name = data.file_name;
  await nf.save();

  const redis = await getRedisClient();
  await redis.del(`newFiles:${data.id_news}`);

  return { status: 200 };
}

export const updateNewFile = async (data: any) => {
  await dbConnect();
  let nf = await NewFile.findOne({ _id: data._id });
  if (nf) {
    nf.file = data.file;
    nf.file_name = data.file_name;
    await nf.save();

    const redis = await getRedisClient();
    await redis.del(`newFiles:${nf.id_news}`);
  }

  return { status: 200 };
}
