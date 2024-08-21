import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

const PHvacSchema: MongooseSchema = new mongoose.Schema(
	{
		name1: { type: String },
		image1: { type: String },
		name2: { type: String },
		image2: { type: String },
		name3: { type: String },
		image3: { type: String },
		name4: { type: String },
		image4: { type: String },
		name5: { type: String },
		image5: { type: String },
		name6: { type: String },
		image6: { type: String },

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

interface IPHvac extends Document {
	name1: string;
	image1: string;
	name2: string;
	image2: string;
	name3: string;
	image3: string;
	name4: string;
	image4: string;
	name5: string;
	image5: string;
	name6: string;
	image6: string;

	workingFields: {
		_id: string;
		title: string;
		descriptions: {
			column: number;
			sub: string;
		}[];
	}[];
}

const PHvac = mongoose.models.PHvac || mongoose.model<IPHvac>("PHvac", PHvacSchema);

export default PHvac;
