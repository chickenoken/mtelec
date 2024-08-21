"use server";
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Companies from "@model/Companies";

export const insertCompany = async (data: string[]) => {
  await dbConnect();
  for (let i of data) {
    await Companies.create({ path: i });
  }

  const redis = await getRedisClient();
  await redis.del('companies');

  return { status: 200 };
};

export const getCompanyById = async (id: string) => {
  const redis = await getRedisClient();
  const cacheKey = `company:${id}`;
  let company = await redis.get(cacheKey);

  if (company) return JSON.parse(company);

  await dbConnect();
  company = await Companies.findOne({ _id: id });
  const result = JSON.parse(JSON.stringify(company));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
};

export const getAllCompanies = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'companies';
  let companies = await redis.get(cacheKey);

  if (companies) return JSON.parse(companies);

  await dbConnect();
  companies = await Companies.find({});
  const result = JSON.parse(JSON.stringify(companies));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
};

export const getCompanyWithProduct = async () => {
  const redis = await getRedisClient();
  const cacheKey = 'companiesWithProducts';
  let companies = await redis.get(cacheKey);

  if (companies) return JSON.parse(companies);

  await dbConnect();
  companies = await Companies.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "company",
        as: "products",
      },
    },
  ]);
  const result = JSON.parse(JSON.stringify(companies));

  await redis.set(cacheKey, JSON.stringify(result), { EX: 28800 });
  return result;
};

export const updateCompany = async ({ id, path }: { id: string; path: string }) => {
  await dbConnect();
  await Companies.updateOne(
    {
      _id: id,
    },
    {
      path,
    }
  );

  const redis = await getRedisClient();
  await redis.del(`company:${id}`);
  await redis.del('companies');
  await redis.del('companiesWithProducts');

  return { status: 200 };
};
