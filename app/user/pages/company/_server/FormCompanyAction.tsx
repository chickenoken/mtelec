"use server"
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PCompanyInfo from "@model/PCompanyInfo";

export const savePCompanyInfo = async (data: any) => {
  await dbConnect();
  let inf = await PCompanyInfo.findOne();
  if (!inf) inf = new PCompanyInfo();

  inf.name = data.name;
  inf.type = data.type;
  inf.tax = data.tax;
  inf.address = data.address;
  inf.tel = data.tel;
  inf.email = data.email;
  inf.web = data.web;
  inf.fileName1 = data.fileName1;
  inf.fileName2 = data.fileName2;
  inf.fileName3 = data.fileName3;
  inf.fileName4 = data.fileName4;
  inf.fileName5 = data.fileName5;

  if (data.image1) inf.image1 = data.image1;
  if (data.image2) inf.image2 = data.image2;
  if (data.image3) inf.image3 = data.image3;
  if (data.image4) inf.image4 = data.image4;
  if (data.image5) inf.image5 = data.image5;

  const redis = await getRedisClient();
  await redis.del('pcompanyinfo');

  await inf.save();
  return { status: 200 };
}

export const getPCompanyInfo = async () => {
  const redis = await getRedisClient();
  let inf = await redis.get('pcompanyinfo');
  if (inf) return JSON.parse(inf);

  await dbConnect();
  inf = await PCompanyInfo.findOne();
  inf = JSON.parse(JSON.stringify(inf));
  await redis.set('pcompanyinfo', JSON.stringify(inf), { EX: 28800 });

  return inf;
}
