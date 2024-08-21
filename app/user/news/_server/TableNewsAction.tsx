"use server";
import dbConnect from "@db/db";
import NewFile from "@model/NewFile";
import News from "@model/News";

export const getAllNew = async () => {
  await dbConnect();
  const ne = await News.find();
  return JSON.parse(JSON.stringify(ne));
}

export const delNew = async (id: any) => {
  await dbConnect();
  await News.deleteOne({ _id : id });
  await NewFile.deleteMany({ id_news : id });
  return {status : 200};
}