"use server"
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PAbout from "@model/PAbout";

export const savePAbout = async (data: any) => {
  await dbConnect();
  let res = await PAbout.findOne();
  if(!res) res = new PAbout();
  res.title = data.title;
  res.content = data.content;
  res.desc = data.desc;
  res.team_title = data.team_title;
  res.team_content = data.team_content;
  res.icon_name1 = data.icon_name1;
  res.icon_desc1 = data.icon_desc1;
  res.icon_name2 = data.icon_name2;
  res.icon_desc2 = data.icon_desc2;
  res.icon_name3 = data.icon_name3;
  res.icon_desc3 = data.icon_desc3;
  res.vision = data.vision;
  res.val_title1 = data.val_title1;
  res.val_desc1 = data.val_desc1;
  res.val_title2 = data.val_title2;
  res.val_desc2 = data.val_desc2;
  res.val_title3 = data.val_title3;
  res.val_desc3 = data.val_desc3;
  res.core_title1 = data.core_title1;
  res.core_desc1 = data.core_desc1;
  res.core_title2 = data.core_title2;
  res.core_desc2 = data.core_desc2;
  res.core_title3 = data.core_title3;
  res.core_desc3 = data.core_desc3;
  res.core_title4 = data.core_title4;
  res.core_desc4 = data.core_desc4;

  if(data.image1) res.image1 = data.image1;
  if(data.image2) res.image2 = data.image2;
  if(data.icon1) res.icon1 = data.icon1;
  if(data.icon2) res.icon2 = data.icon2;
  if(data.icon3) res.icon3 = data.icon3;
  if(data.val1) res.val1 = data.val1;
  if(data.val2) res.val2 = data.val2;
  if(data.val3) res.val3 = data.val3;
  if(data.core1) res.core1 = data.core1;
  if(data.core2) res.core2 = data.core2;
  if(data.core3) res.core3 = data.core3;
  if(data.core4) res.core4 = data.core4;

  const redis = await getRedisClient();
  await redis.del('pabout');

  await res.save();
  return { status: 200 };
}

export const getPAbout = async () => {
  const redis = await getRedisClient();
  let res = await redis.get('pabout');
  if (res) return JSON.parse(res);

  await dbConnect();
  res = await PAbout.findOne();
  res = JSON.parse(JSON.stringify(res));
  await redis.set('pabout', JSON.stringify(res), { EX: 28800 });

  return res;
}