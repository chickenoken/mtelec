import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const CustomerSchema: MongooseSchema = new mongoose.Schema({
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
  note: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  note: string;
  created_at: Date;
}

const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;