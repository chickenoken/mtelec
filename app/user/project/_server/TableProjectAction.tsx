"use server";
import dbConnect from "@db/db";
import Project from "@model/Project";

export const getAllProject = async () => {
  await dbConnect();
  const pro = await Project.find({});
  return JSON.parse(JSON.stringify(pro));
}

export const delProject = async (id: any) => {
  await dbConnect();
  await Project.deleteOne({ _id : id });
  return {status : 200};
}