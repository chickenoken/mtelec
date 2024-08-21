import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const AppliantSchema: MongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  cv: {
    type: String
  }
},{timestamps: true});

interface IAppliant extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  cv: string;
}

const Appliant = mongoose.models.Appliant || mongoose.model<IAppliant>('Appliant', AppliantSchema);

export default Appliant;