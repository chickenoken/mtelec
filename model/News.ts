import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const NewsSchema: MongooseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  content: {
    type: String
  },
  dateUp: {
    type: Date
  },
},{timestamps: true});

interface INews extends Document {
  title: string;
  content: String;
  type: string;
  dateUp: Date;

}

const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;