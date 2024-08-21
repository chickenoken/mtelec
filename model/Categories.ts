import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const CategoriesSchema: MongooseSchema = new mongoose.Schema({
  cate_name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  project_detail: {
    type: String
  },
  project_detail_num: {
    type: String
  }
},{timestamps: true});

interface ICategories extends Document {
  cate_name: string;
  image: String;
  project_detail: String;
  project_detail_num: String;
}

const Categories = mongoose.models.Categories || mongoose.model<ICategories>('Categories', CategoriesSchema);

export default Categories;