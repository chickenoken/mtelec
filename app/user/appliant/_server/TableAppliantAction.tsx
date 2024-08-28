"use server"
import dbConnect from "@db/db";
import Appliant from "@model/Appliant";

export const getAllAppliant = async () => {
  await dbConnect();
  const appliant = await Appliant.find({}).sort({ createdAt: -1 });
  return appliant;
}

export const delAppliant = async (id: any) => {
  await dbConnect();
  await Appliant.deleteOne({ _id : id });
  return {status : 200};
}