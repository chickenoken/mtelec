"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Recruitment from "@model/Recruitment";

export const getRecruitById = async (data: any) => {
  const redis = await getRedisClient();
  const cacheKey = `recruitById:${data.id}:${data.language}`;
  let re = await redis.get(cacheKey);
  
  if (re) return JSON.parse(re);

  await dbConnect();
  re = await Recruitment.findOne({ id_recruitment: data.id, language: data.language });
  re = JSON.parse(JSON.stringify(re));
  await redis.set(cacheKey, JSON.stringify(re), { EX: 28800 });

  return re;
}

export const getRecruitByBoth = async (data: any) => {
  const redis = await getRedisClient();
  const cacheKey = `recruitByBoth:${data.id}`;
  let re = await redis.get(cacheKey);
  
  if (re) return JSON.parse(re);

  await dbConnect();
  re = await Recruitment.find({ id_recruitment: data.id }).sort({ language: 1 });
  re = JSON.parse(JSON.stringify(re));
  await redis.set(cacheKey, JSON.stringify(re), { EX: 28800 });

  return re;
}

export const saveRecruit = async (data: any) => {
  await dbConnect();
  let re = new Recruitment();
  re.title = data['title'];
  re.gender = data['gender'];
  re.education = data['education'];
  re.experience = data['experience'];
  re.work_time = data['work_time'];
  re.work_form = data['work_form'];
  re.work_place = data['work_place'];
  re.salary = data['salary'];
  re.job_description = data['job_description'];
  re.requirement = data['requirement'];
  re.benefit = data['benefit'];
  re.document = data['document'];
  re.contact = data['contact'];
  re.deadline = data['deadline'] ?? new Date();
  re.quantity = data['quantity'];
  re.language = data['language'];
  re.sort = data['sort'];

  if (!data['id']) {
    const maxId = await Recruitment.findOne().sort('-id_recruitment').select('id_recruitment');
    re.id_recruitment = maxId ? maxId.id_recruitment + 1 : 1;
  } else {
    re.id_recruitment = data['id'];
  }

  await Recruitment.updateMany(
    { id_recruitment: re.id_recruitment },
    { $set: { sort: re.sort } }
  );

  await re.save();

  // Invalidate related caches
  const redis = await getRedisClient();
  await redis.del(`recruitById:${re.id_recruitment}:vi`);
  await redis.del(`recruitById:${re.id_recruitment}:en`);
  await redis.del(`recruitByBoth:${re.id_recruitment}`);
  await redis.del(`allRecruitment`);

  return { status: 200 };
}

export const updateRecruit = async (data: any) => {
  await dbConnect();
  let re = await Recruitment.findOne({ id_recruitment: data['id_recruitment'], language: data['language'] });
  if (!re) {
    re = new Recruitment();
    re.id_recruitment = data['id_recruitment'];
  }
  re.title = data['title'];
  re.gender = data['gender'];
  re.education = data['education'];
  re.experience = data['experience'];
  re.work_time = data['work_time'];
  re.work_form = data['work_form'];
  re.work_place = data['work_place'];
  re.salary = data['salary'];
  re.job_description = data['job_description'];
  re.requirement = data['requirement'];
  re.benefit = data['benefit'];
  re.document = data['document'];
  re.contact = data['contact'];
  re.deadline = data['deadline'];
  re.quantity = data['quantity'];
  re.language = data['language'];
  re.sort = data['sort'];
  await re.save();

  await Recruitment.updateMany(
    { id_recruitment: re.id_recruitment },
    { $set: { sort: re.sort } }
  );

  // Invalidate related caches
  const redis = await getRedisClient();
  await redis.del(`recruitById:${re.id_recruitment}:en`);
  await redis.del(`recruitById:${re.id_recruitment}:vi`);
  await redis.del(`recruitByBoth:${re.id_recruitment}`);
  await redis.del(`allRecruitment`);

  return { status: 200 };
}