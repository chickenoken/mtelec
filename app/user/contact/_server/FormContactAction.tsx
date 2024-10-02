"use server"
import dbConnect from "@db/db";
import getRedisClient from "@db/redis";
import Contact from "@model/Contact";

export const saveContactInfo = async (data: any) => {
    await dbConnect();
    let model = await Contact.findOne();
    if(!model) model = new Contact();
    model.label = data.label;
    model.address = data.address;
    model.phone = data.phone;
    model.email = data.email;
    model.latitude = data.latitude;
    model.longitude = data.longitude;
    await model.save();
  
    const redis = await getRedisClient();
    await redis.del('Contact');
  
    return { status: 200 };
}

export const getContactInfo = async () => {
    const redis = await getRedisClient();
    let model = await redis.get('Contact');
    if (model) {
      return JSON.parse(model);
    }

    await dbConnect();
    model = await Contact.findOne();
    model = JSON.parse(JSON.stringify(model));

    await redis.set('Contact', JSON.stringify(model), { EX: 28800,});
    return model;
}
