import mongoose, { Schema as MongooseSchema } from "mongoose";

const ProductsSchema: MongooseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		company: {
			type: MongooseSchema.Types.ObjectId,
			ref: "Companies",
			required: true,
		},
	},
	{ timestamps: true }
);

const Products = mongoose.models.Products || mongoose.model("Products", ProductsSchema);

export default Products;
