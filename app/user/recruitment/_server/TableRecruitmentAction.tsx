"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Recruitment from "@model/Recruitment";

export const getAllRecruitment = async () => {
  const redis = await getRedisClient();
  let pro = await redis.get('allRecruitment');
  if (pro) return JSON.parse(pro);

  await dbConnect();
  pro = await Recruitment.find({}).sort({ sort: 1, id_recruitment: 1, language: 1 });
  pro = JSON.parse(JSON.stringify(pro));
  await redis.set('allRecruitment', JSON.stringify(pro), { EX: 28800 });

  return pro;
}

export const delRecruitment = async (id: any) => {
  await dbConnect();
  await Recruitment.deleteMany({ id_recruitment: id });

  const redis = await getRedisClient();
  await redis.del('allRecruitment');

  return { status: 200 };
}
