"use server"
import { IProduct } from "@app/(main)/products/page";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PIndex from "@model/PIndex";
import Project from "@model/Project";

export const savePIndex = async (data: any) => {
  await dbConnect();
  let ind = await PIndex.findOne();
  if(!ind) ind = new PIndex();
  ind.about1 = data.about1;
  ind.about2 = data.about2;
  ind.concept = data.concept;
  if(data.image1) ind.image1 = data.image1;
  if(data.image2) ind.image2 = data.image2;
  await ind.save();

  const redis = await getRedisClient();
  await redis.del('pindex');

  return { status: 200 };
}

export const getPIndex = async () => {
  const redis = await getRedisClient();
  let ind = await redis.get('pindex');
  if (ind) {
    return JSON.parse(ind);
  }

  // If not found in cache, fetch from MongoDB
  await dbConnect();
  ind = await PIndex.findOne();
  ind = JSON.parse(JSON.stringify(ind));

  await redis.set('pindex', JSON.stringify(ind), { EX: 28800,});

  return ind;
}

export const getFactory = async (): Promise<IProduct[]> => {
  const redis = await getRedisClient();
  
  // Try to get data from Redis cache
  let ind = await redis.get('factory');
  
  if (ind) {
    return JSON.parse(ind);
  }

  await dbConnect();
  ind = await Project.find();

  const formattedInd = ind.map((item: any) => ({
    _id: item._id,
    company: item.company,
    title: item.project_name,
    path: item.image,
  }));

  await redis.set('factory', JSON.stringify(formattedInd), { EX: 28800, });

  return formattedInd;
}