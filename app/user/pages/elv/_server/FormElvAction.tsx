"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import PElv from "@model/PElv";
import { IDataWorkingField } from "../../automation/_server/FormAutomationAction";

export const savePElv = async (data: any) => {
  await dbConnect();
  let inf = await PElv.findOne();
  if (!inf) inf = new PElv();
  
  inf.name1 = data.name1;
  inf.name2 = data.name2;
  inf.name3 = data.name3;
  inf.name4 = data.name4;
  
  if (data.image1) inf.image1 = data.image1;
  if (data.image2) inf.image2 = data.image2;
  if (data.image3) inf.image3 = data.image3;
  if (data.image4) inf.image4 = data.image4;
  
  await inf.save();
  
  const redis = await getRedisClient();
  await redis.del('pElv');
  await redis.del('pElvWorkingFields');

  return { status: 200 };
};

export const getPElv = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'pElv';
  let inf = await redis.get(cacheKey);

  if (inf) return JSON.parse(inf);

  await dbConnect();
  inf = await PElv.findOne();
  const result = JSON.parse(JSON.stringify(inf));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
};

export const getPElvWorkingField = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'pElvWorkingFields';
  let workingFields = await redis.get(cacheKey);

  if (workingFields) return JSON.parse(workingFields);

  await dbConnect();
  const res = await PElv.find({}, { workingFields: 1 });
  const result = res.length ? JSON.parse(JSON.stringify(res[0].workingFields)) : [];

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
};

export const getPElvDataById = async (id: string) => {
  await dbConnect();
  const res = await PElv.findById(id);
  return JSON.parse(JSON.stringify(res));
};

export const getPElvWorkingFieldById = async (id: string) => {
  await dbConnect();
  const res = await PElv.findOne({ "workingFields._id": id }, { "workingFields.$": 1 });
  return JSON.parse(JSON.stringify(res));
};

export const createWorkingField = async (id: string, data: IDataWorkingField) => {
  await dbConnect();

  await PElv.updateOne(
    { _id: id },
    {
      $push: {
        workingFields: {
          title: data.title,
          descriptions: [
            {
              column: 1,
              sub: data.sub1 ? data.sub1 : undefined,
            },
            {
              column: 2,
              sub: data.sub2 ? data.sub2 : undefined,
            },
          ],
        },
      },
    }
  );

  const redis = await getRedisClient();
  await redis.del('pElvWorkingFields');

  return { status: 200 };
};

export const updateWorkingFieldByWorkingId = async (id: string, data: IDataWorkingField) => {
  await dbConnect();

  await PElv.updateOne(
    { "workingFields._id": id },
    {
      $set: {
        "workingFields.$.title": data.title,
        "workingFields.$.descriptions.0.sub": data.sub1 ? data.sub1 : undefined,
        "workingFields.$.descriptions.1.sub": data.sub2 ? data.sub2 : undefined,
      },
    }
  );

  const redis = await getRedisClient();
  await redis.del('pElvWorkingFields');

  return { status: 200 };
};