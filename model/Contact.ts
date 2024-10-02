import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const ContactSchema: MongooseSchema = new mongoose.Schema({
  label: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String
  }
},{timestamps: true});

interface IContact extends Document {
  label: string;
  address: string;
  phone: string;
  email: string;
  latitude: string;
  longitude: string;
}

const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;