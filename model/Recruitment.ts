import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const RecruitmentSchema: MongooseSchema = new mongoose.Schema({
  id_recruitment: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  work_time: {
    type: String
  },
  work_form: {
    type: String
  },
  work_place: {
    type: String
  },
  salary: {
    type: String
  },
  job_description: {
    type: String
  },
  requirement: {
    type: String
  },
  benefit: {
    type: String
  },
  document: {
    type: String
  },
  contact: {
    type: String
  },
  deadline: {
    type: Date
  },
  quantity: {
    type: String
  },
  language: {
    type: String
  },
  sort: {
    type: Number
  }
},{timestamps: true});

interface IRecruitment extends Document {
  id_recruitment: number;
  title: string;
  gender: string;
  education: string;
  experience: string;
  work_time: string;
  work_form: string;
  work_place: string;
  salary: string;
  job_description: string;
  requirement: string;
  benefit: string;
  document: string;
  contact: string;
  deadline: Date;
  quantity: string;
  language: string;
  sort: number;
}

const Recruitment = mongoose.models.Recruitment || mongoose.model<IRecruitment>('Recruitment', RecruitmentSchema);

export default Recruitment;