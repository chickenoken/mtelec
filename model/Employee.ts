import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const EmployeeSchema: MongooseSchema = new mongoose.Schema({
  ceo_name1: {
    type: String
  },
  ceo_image1: {
    type: String
  },
  ceo_title1: {
    type: String
  },
  ceo_tdesc1: {
    type: String
  },
  ceo_desc1: {
    type: String
  },
  ceo_name2: {
    type: String
  },
  ceo_image2: {
    type: String
  },
  ceo_title2: {
    type: String
  },
  ceo_tdesc2: {
    type: String
  },
  ceo_desc2: {
    type: String
  },

  cm_name1: {
    type: String
  },
  cm_image1: {
    type: String
  },
  cm_title1: {
    type: String
  },
  cm_desc1: {
    type: String
  },
  cm_name2: {
    type: String
  },
  cm_image2: {
    type: String
  },
  cm_title2: {
    type: String
  },
  cm_desc2: {
    type: String
  },

  m_name1: {
    type: String
  },
  m_image1: {
    type: String
  },
  m_title1: {
    type: String
  },
  m_desc1: {
    type: String
  },
  m_name2: {
    type: String
  },
  m_image2: {
    type: String
  },
  m_title2: {
    type: String
  },
  m_desc2: {
    type: String
  },
  m_name3: {
    type: String
  },
  m_image3: {
    type: String
  },
  m_title3: {
    type: String
  },
  m_desc3: {
    type: String
  },

  sm_name1: {
    type: String
  },
  sm_image1: {
    type: String
  },
  sm_title1: {
    type: String
  },
  sm_desc1: {
    type: String
  },
  sm_name2: {
    type: String
  },
  sm_image2: {
    type: String
  },
  sm_title2: {
    type: String
  },
  sm_desc2: {
    type: String
  },
  sm_name3: {
    type: String
  },
  sm_image3: {
    type: String
  },
  sm_title3: {
    type: String
  },
  sm_desc3: {
    type: String
  },
  sm_name4: {
    type: String
  },
  sm_image4: {
    type: String
  },
  sm_title4: {
    type: String
  },
  sm_desc4: {
    type: String
  },

},{timestamps: true});

interface IEmployeeSchema extends Document {
  ceo_name1: string;
  ceo_image1: string;
  ceo_title1: string;
  ceo_tdesc1: string;
  ceo_desc1: string;
  ceo_name2: string;
  ceo_image2: string;
  ceo_title2: string;
  ceo_tdesc2: string;
  ceo_desc2: string;

  cm_name1: string;
  cm_image1: string;
  cm_title1: string;
  cm_desc1: string;
  cm_name2: string;
  cm_image2: string;
  cm_title2: string;
  cm_desc2: string;

  m_name1: string;
  m_image1: string;
  m_title1: string;
  m_desc1: string;
  m_name2: string;
  m_image2: string;
  m_title2: string;
  m_desc2: string;
  m_name3: string;
  m_image3: string;
  m_title3: string;
  m_desc3: string;

  sm_name1: string;
  sm_image1: string;
  sm_title1: string;
  sm_desc1: string;
  sm_name2: string;
  sm_image2: string;
  sm_title2: string;
  sm_desc2: string;
  sm_name3: string;
  sm_image3: string;
  sm_title3: string;
  sm_desc3: string;
  sm_name4: string;
  sm_image4: string;
  sm_title4: string;
  sm_desc4: string;
}

const Employee = mongoose.models.Employee || mongoose.model<IEmployeeSchema>('Employee', EmployeeSchema);

export default Employee;