import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

const PElectricDesignSchema: MongooseSchema = new mongoose.Schema(
	{
		name: { type: String },
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
		name7: { type: String },
		image7: { type: String },
		name8: { type: String },
		image8: { type: String },
		name9: { type: String },
		image9: { type: String },
		name10: { type: String },
		image10: { type: String },
		name11: { type: String },
		image11: { type: String },

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

interface IPElectricDesign extends Document {
	name: string;
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
	name7: string;
	image7: string;
	name8: string;
	image8: string;
	name9: string;
	image9: string;
	name10: string;
	image10: string;
	name11: string;
	image11: string;

	workingFields: {
		_id: string;
		title: string;
		descriptions: {
			column: number;
			sub: string;
		}[];
	}[];
}

const PElectricDesign =
	mongoose.models.PElectricDesign ||
	mongoose.model<IPElectricDesign>("PElectricDesign", PElectricDesignSchema);

export default PElectricDesign;
