import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const CateProjectSchema: MongooseSchema = new mongoose.Schema({
  cate_id: {
    type: String,
    required: true
  },
  cate_title: {
    type: String,
    required: true
  },
  cate_pro_name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  detail: {
    type: String
  }
},{timestamps: true});

interface ICateProject extends Document {
  cate_id: string;
  cate_title: string;
  cate_pro_name: String;
  location: String;
  detail: String;
}

const CateProject = mongoose.models.CateProject || mongoose.model<ICateProject>('CateProject', CateProjectSchema);

export default CateProject;