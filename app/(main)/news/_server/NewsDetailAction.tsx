"use server";
import dbConnect from "@db/db";

export const getNewMain = async () => {
  await dbConnect();
  return JSON.parse(JSON.stringify(''));
}

