import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const ProjectSchema: MongooseSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  client: {
    type: String
  },
  location: {
    type: String
  },
  complete_date: {
    type: String
  },
  working_field: {
    type: String
  }
},{timestamps: true});

interface IProject extends Document {
  project_name: string;
  image: String;
  logo: String;
  client: string;
  location: string;
  complete_date: string;
  working_field: string;
}

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;