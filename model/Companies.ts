import mongoose, { Schema as MongooseSchema } from "mongoose";

const CompaniesSchema: MongooseSchema = new mongoose.Schema(
	{
		path: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Companies = mongoose.models.Companies || mongoose.model("Companies", CompaniesSchema);

export default Companies;
