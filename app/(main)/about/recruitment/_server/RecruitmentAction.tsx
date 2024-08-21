"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Appliant from "@model/Appliant";

export const saveApplyRecruit = async (data: any) => {
  await dbConnect();
  let re = new Appliant();
  re.name = data['name'];
  re.email = data['email'];
  re.phone = data['phone'];
  re.position = data['position'];
  re.cv = data['cv'];

  const redis = await getRedisClient();
  await redis.del('applyRecruit');

  await re.save();
  return { status: 200 };
}

export const getApplyRecruit = async () => {
  const redis = await getRedisClient();
  let re = await redis.get('applyRecruit');
  if (re) return JSON.parse(re);

  await dbConnect();
  re = await Appliant.find();
  re = JSON.parse(JSON.stringify(re));
  await redis.set('applyRecruit', JSON.stringify(re), { EX: 28800 });

  return re;
}
