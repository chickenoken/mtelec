"use server"
import dbConnect from "@db/db";
import Customer from "@model/Customer";

export const getAllCustomer = async () => {
  await dbConnect();
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  return customers;
}

export const delCustomer = async (id: any) => {
  await dbConnect();
  await Customer.deleteOne({ _id : id });
  return {status : 200};
}