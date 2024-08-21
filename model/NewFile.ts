import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const NewFileSchema: MongooseSchema = new mongoose.Schema({
  id_news: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  file_name: {
    type: String
  },
},{timestamps: true});

interface INewFile extends Document {
  id_news: string;
  file: String;
  file_name: String;
}

const NewFile = mongoose.models.NewFile || mongoose.model<INewFile>('NewFile', NewFileSchema);

export default NewFile;