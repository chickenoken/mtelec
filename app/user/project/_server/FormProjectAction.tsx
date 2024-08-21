"use server";
import dbConnect from "@db/db";
import Project from "@model/Project";

export const getProjectById = async (id: any) => {
    await dbConnect();
    let po = await Project.findOne({ _id: id });
    return JSON.parse(JSON.stringify(po));
}

export const saveProject = async (data: any) => {
    await dbConnect();
    let pro = new Project();
    pro.project_name = data.project_name;
    pro.image = data.image;
    pro.logo = data.logo;
    pro.client = data.client;
    pro.location = data.location;
    pro.complete_date = data.complete_date;
    pro.working_field = data.working_field;
    await pro.save();
    return { status: 200 };
}

export const updateProject = async (data: any) => {
    await dbConnect();
    let po = await Project.findOne({ _id: data._id });
    po.project_name = data.project_name;
    po.image = data.image;
    po.logo = data.logo;
    po.client = data.client;
    po.location = data.location;
    po.complete_date = data.complete_date;
    po.working_field = data.working_field;
    await po.save();
    return { status: 200 };
}
