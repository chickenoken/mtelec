import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const PPPESchema: MongooseSchema = new mongoose.Schema({
  image1: { type: String },
  title1: { type: String },
  content1: { type: String},
  title2: { type: String },
  content2: { type: String },
  title3: { type: String },
  content3: { type: String },
},{timestamps: true});

interface IPPPE extends Document {
  image1: string;
  title1: string;
  content1: string;
  title2: string;
  content2: string;
  title3: string;
  content3: string;
}

const PPPE = mongoose.models.PPPE || mongoose.model<IPPPE>('PPPE', PPPESchema);

export default PPPE;