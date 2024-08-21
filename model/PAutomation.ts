import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

const PAutomationSchema: MongooseSchema = new mongoose.Schema(
	{
		image1: { type: String },
		image1_1: { type: String },
		image1_2: { type: String },
		image2: { type: String },
		name3: { type: String },
		image3: { type: String },
		name4: { type: String },
		image4: { type: String },
		name5: { type: String },
		image5: { type: String },
		name6: { type: String },
		image6: { type: String },
		name7: { type: String },
		image7: { type: String },
		name8: { type: String },
		image8: { type: String },

		workingFields: [
			{
				title: { type: String },
				descriptions: [
					{
						_id: false,
						column: { type: Number },
						sub: { type: String },
					},
				],
			},
		],
	},
	{ timestamps: true }
);

export interface IPAutomation extends Document {
	image1: string;
	image1_1: string;
	image1_2: string;
	image2: string;
	name3: string;
	image3: string;
	name4: string;
	image4: string;
	name5: string;
	image5: string;
	name6: string;
	image6: string;
	name7: string;
	image7: string;
	name8: string;
	image8: string;

	workingFields: {
		_id: string;
		title: string;
		descriptions: {
			column: number;
			sub: string;
		}[];
	}[];
}

const PAutomation =
	mongoose.models.PAutomation || mongoose.model<IPAutomation>("PAutomation", PAutomationSchema);

export default PAutomation;
