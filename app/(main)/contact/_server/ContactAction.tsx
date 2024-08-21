"use server";
import dbConnect from "@db/db";
import Customer from "@model/Customer";

export const saveContact = async (data: any) => {
  await dbConnect();
  let cus = new Customer();
  cus.name = data['name'];
  cus.email = data['email'];
  cus.phone = data['phone'];
  cus.note = data['note'];
  await cus.save();
  return {status: 200};
}
