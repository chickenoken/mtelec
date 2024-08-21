"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PElectricService from "@model/PElectricService";

export const savePElectricService = async (data: any) => {
  await dbConnect();
  let service = await PElectricService.findOne();
  if (!service) service = new PElectricService();
  
  if (data.image1) service.image1 = data.image1;
  if (data.image2) service.image2 = data.image2;
  if (data.image3) service.image3 = data.image3;
  if (data.image4) service.image4 = data.image4;
  if (data.image5) service.image5 = data.image5;
  if (data.image6) service.image6 = data.image6;
  if (data.image7) service.image7 = data.image7;
  
  service.wk1 = data.wk1;
  service.wk2 = data.wk2;
  service.wk3 = data.wk3;
  service.wk4 = data.wk4;
  service.wk5 = data.wk5;

  await service.save();

  const redis = await getRedisClient();
  await redis.del('pElectricService');

  return { status: 200 };
}

export const getPElectricService = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'pElectricService';
  let service = await redis.get(cacheKey);

  if (service) return JSON.parse(service);

  await dbConnect();
  service = await PElectricService.findOne();
  const result = JSON.parse(JSON.stringify(service));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
}
