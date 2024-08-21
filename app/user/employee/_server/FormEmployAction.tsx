"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Employee from "@model/Employee";

export const saveEmplCeo = async (data: any) => {
  await dbConnect();
  let empl = await Employee.findOne();
  if (!empl) empl = new Employee();
  empl.ceo_name1 = data.ceo_name1;
  empl.ceo_image1 = data.ceo_image1;
  empl.ceo_title1 = data.ceo_title1;
  empl.ceo_tdesc1 = data.ceo_tdesc1;
  empl.ceo_desc1 = data.ceo_desc1;
  empl.ceo_name2 = data.ceo_name2;
  empl.ceo_image2 = data.ceo_image2;
  empl.ceo_title2 = data.ceo_title2;
  empl.ceo_tdesc2 = data.ceo_tdesc2;
  empl.ceo_desc2 = data.ceo_desc2;
  await empl.save();

  const redis = await getRedisClient();
  await redis.del('employee');

  return { status: 200 };
}

export const saveEmplCoreManager = async (data: any) => {
  await dbConnect();
  let empl = await Employee.findOne();
  if (!empl) empl = new Employee();
  empl.cm_name1 = data.cm_name1;
  empl.cm_image1 = data.cm_image1;
  empl.cm_title1 = data.cm_title1;
  empl.cm_desc1 = data.cm_desc1;
  empl.cm_name2 = data.cm_name2;
  empl.cm_image2 = data.cm_image2;
  empl.cm_title2 = data.cm_title2;
  empl.cm_desc2 = data.cm_desc2;
  await empl.save();

  const redis = await getRedisClient();
  await redis.del('employee');

  return { status: 200 };
}

export const saveEmplManager = async (data: any) => {
  await dbConnect();
  let empl = await Employee.findOne();
  if (!empl) empl = new Employee();
  empl.m_name1 = data.m_name1;
  empl.m_image1 = data.m_image1;
  empl.m_title1 = data.m_title1;
  empl.m_desc1 = data.m_desc1;
  empl.m_name2 = data.m_name2;
  empl.m_image2 = data.m_image2;
  empl.m_title2 = data.m_title2;
  empl.m_desc2 = data.m_desc2;
  empl.m_name3 = data.m_name3;
  empl.m_image3 = data.m_image3;
  empl.m_title3 = data.m_title3;
  empl.m_desc3 = data.m_desc3;
  await empl.save();

  const redis = await getRedisClient();
  await redis.del('employee');

  return { status: 200 };
}

export const saveEmplSiteManager = async (data: any) => {
  await dbConnect();
  let empl = await Employee.findOne();
  if (!empl) empl = new Employee();
  empl.sm_name1 = data.sm_name1;
  empl.sm_image1 = data.sm_image1;
  empl.sm_title1 = data.sm_title1;
  empl.sm_desc1 = data.sm_desc1;
  empl.sm_name2 = data.sm_name2;
  empl.sm_image2 = data.sm_image2;
  empl.sm_title2 = data.sm_title2;
  empl.sm_desc2 = data.sm_desc2;
  empl.sm_name3 = data.sm_name3;
  empl.sm_image3 = data.sm_image3;
  empl.sm_title3 = data.sm_title3;
  empl.sm_desc3 = data.sm_desc3;
  empl.sm_name4 = data.sm_name4;
  empl.sm_image4 = data.sm_image4;
  empl.sm_title4 = data.sm_title4;
  empl.sm_desc4 = data.sm_desc4;
  await empl.save();

  const redis = await getRedisClient();
  await redis.del('employee');

  return { status: 200 };
}

export const getEmpl = async () => {
  const redis = await getRedisClient();
  let empl = await redis.get('employee');
  
  if (empl) return JSON.parse(empl);

  await dbConnect();
  empl = await Employee.findOne();
  empl = JSON.parse(JSON.stringify(empl));
  await redis.set('employee', JSON.stringify(empl), { EX: 28800 });

  return empl;
}