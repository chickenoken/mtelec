import mongoose, { Schema as MongooseSchema } from 'mongoose';

const PElectricServiceSchema: MongooseSchema = new mongoose.Schema({
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  image5: { type: String },
  image6: { type: String },
  image7: { type: String },
  wk1: { type: String },
  wk2: { type: String },
  wk3: { type: String },
  wk4: { type: String },
  wk5: { type: String },
}, { timestamps: true });

const PElectricService = mongoose.models.PElectricService || mongoose.model('PElectricService', PElectricServiceSchema);

export default PElectricService;
