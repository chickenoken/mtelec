"use server"
import dbConnect from "@db/db";
import Categories from "@model/Categories";

export const getCateById = async (id: any) => {
  await dbConnect();
  let cate = await Categories.findOne({ _id: id });
  return JSON.parse(JSON.stringify(cate));
}

export const saveCate = async (data: any) => {
  await dbConnect();
  let cate = new Categories();
  cate.cate_name = data.cate_name;
  cate.image = data.image;
  await cate.save();
  return { status: 200 };
}

export const updateCate = async (data: any) => {
  await dbConnect();
  let cate = await Categories.findOne({ _id: data._id });
  cate.cate_name = data.cate_name;
  cate.image = data.image;
  await cate.save();
  return { status: 200 };
}
