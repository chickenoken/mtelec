"use server"
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PPPE from "@model/PPPE";

export const savePPPE = async (data: any) => {
  await dbConnect();
  let pp = await PPPE.findOne();
  if (!pp) pp = new PPPE();
  pp.title1 = data.title1;
  pp.content1 = data.content1;
  pp.title2 = data.title2;
  pp.content2 = data.content2;
  pp.title3 = data.title3;
  pp.content3 = data.content3;
  if (data.image1) pp.image1 = data.image1;

  const redis = await getRedisClient();
  await redis.del('pppe');

  await pp.save();
  return { status: 200 };
}

export const getPPPE = async () => {
  const redis = await getRedisClient();
  let pp = await redis.get('pppe');
  if (pp) return JSON.parse(pp);

  await dbConnect();
  pp = await PPPE.findOne();
  pp = JSON.parse(JSON.stringify(pp));
  await redis.set('pppe', JSON.stringify(pp), { EX: 28800 });

  return pp;
}
