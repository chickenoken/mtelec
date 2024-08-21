"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import NewFile from "@model/NewFile";
import News from "@model/News";

export const getNewMain = async () => {
  const redis = await getRedisClient();
  let ne = await redis.get('newMain');
  
  if (ne) return JSON.parse(ne);

  await dbConnect();
  ne = await News.find().sort({ updatedAt: -1 }).limit(1);

  for (const item of ne) {
    const nf = await NewFile.find({ id_news: item._id }).sort({ createdAt: 1 }).limit(1);
    if (nf.length > 0) {
      ne[0] = ne[0].toObject();
      ne[0]['file'] = nf[0].file;
    }
  }

  const result = JSON.parse(JSON.stringify(ne[0]));
  await redis.set('newMain', JSON.stringify(result), { EX: 28800 });

  return result;
}

export const getNewOther = async () => {
  const redis = await getRedisClient();
  let ne = await redis.get('newOther');

  if (ne) return JSON.parse(ne);

  await dbConnect();
  ne = await News.find().sort({ updatedAt: -1 }).skip(1);

  for (let i = 0; i < ne.length; i++) {
    const nf = await NewFile.find({ id_news: ne[i]._id }).sort({ createdAt: 1 }).limit(1);
    if (nf && nf.length > 0) {
      ne[i] = ne[i].toObject();
      ne[i]['file'] = nf[0].file;
    }
  }

  const result = JSON.parse(JSON.stringify(ne));
  await redis.set('newOther', JSON.stringify(result), { EX: 28800 });

  return result;
}

export const getNewOtherDetail = async (data: any) => {
  const redis = await getRedisClient();
  const cacheKey = `newOtherDetail:${data.id}`;
  let ne = await redis.get(cacheKey);

  if (ne) return JSON.parse(ne);

  await dbConnect();
  ne = await News.find({ _id: { $ne: data.id } }).sort({ updatedAt: -1 });

  for (let i = 0; i < ne.length; i++) {
    const nf = await NewFile.find({ id_news: ne[i]._id }).sort({ createdAt: 1 }).limit(1);
    if (nf && nf.length > 0) {
      ne[i] = ne[i].toObject();
      ne[i]['file'] = nf[0].file;
    }
  }

  const result = JSON.parse(JSON.stringify(ne));
  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });

  return result;
}