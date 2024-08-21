import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const PCompanyInfoSchema: MongooseSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  tax: { type: String},
  address: { type: String },
  tel: { type: String },
  email: { type: String },
  web: { type: String },
  fileName1: { type: String },
  image1: { type: String },
  fileName2: { type: String },
  image2: { type: String },
  fileName3: { type: String },
  image3: { type: String },
  fileName4: { type: String },
  image4: { type: String },
  fileName5: { type: String },
  image5: { type: String },
},{timestamps: true});

interface IPCompanyInfo extends Document {
  name: string;
  type: string;
  tax: string;
  address: string;
  tel: string;
  email: string;
  web: string;
  fileName1: string;
  image1: string;
  fileName2: string;
  image2: string;
  fileName3: string;
  image3: string;
  fileName4: string;
  image4: string;
  fileName5: string;
  image5: string;
}

const PCompanyInfo = mongoose.models.PCompanyInfo || mongoose.model<IPCompanyInfo>('PCompanyInfo', PCompanyInfoSchema);

export default PCompanyInfo;