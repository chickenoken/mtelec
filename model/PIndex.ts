import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const PIndexSchema: MongooseSchema = new mongoose.Schema({
  about1: {
    type: String,
    required: true
  },
  about2: {
    type: String,
    required: true
  },
  concept: {
    type: String,
    required: true
  },
  image1: {
    type: String
  },
  image2: {
    type: String
  },
},{timestamps: true});

interface IPIndex extends Document {
  about1: string;
  about2: String;
  concept: String;
  image1: string;
  image2: string;
}

const PIndex = mongoose.models.PIndex || mongoose.model<IPIndex>('PIndex', PIndexSchema);

export default PIndex;