import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';

const PAboutSchema: MongooseSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  desc: { type: String},
  image1: { type: String },
  image2: { type: String },
  team_title: { type: String },
  team_content: { type: String },
  icon1: { type: String },
  icon_name1: { type: String },
  icon_desc1: { type: String },
  icon2: { type: String },
  icon_name2: { type: String },
  icon_desc2: { type: String },
  icon3: { type: String },
  icon_name3: { type: String },
  icon_desc3: { type: String },
  vision: { type: String },
  val1: { type: String },
  val_title1: { type: String },
  val_desc1: { type: String },
  val2: { type: String },
  val_title2: { type: String },
  val_desc2: { type: String },
  val3: { type: String },
  val_title3: { type: String },
  val_desc3: { type: String },
  core1: { type: String },
  core_title1: { type: String },
  core_desc1: { type: String },
  core2: { type: String },
  core_title2: { type: String },
  core_desc2: { type: String },
  core3: { type: String },
  core_title3: { type: String },
  core_desc3: { type: String },
  core4: { type: String },
  core_title4: { type: String },
  core_desc4: { type: String },
},{timestamps: true});

interface IPAbout extends Document {
  title: string;
  content: string;
  desc: string;
  image1: string;
  image2: string;
  team_title: string;
  team_content: string;
  icon1: string;
  icon_name1: string;
  icon_desc1: string;
  icon2: string;
  icon_name2: string;
  icon_desc2: string;
  icon3: string;
  icon_name3: string;
  icon_desc3: string;
  vision: string;
  val1: string;
  val_title1: string;
  val_desc1: string;
  val2: string;
  val_title2: string;
  val_desc2: string;
  val3: string;
  val_title3: string;
  val_desc3: string;
  core1: string;
  core_title1: string;
  core_desc1: string;
  core2: string;
  core_title2: string;
  core_desc2: string;
  core3: string;
  core_title3: string;
  core_desc3: string;
  core4: string;
  core_title4: string;
  core_desc4: string;
}

const PAbout = mongoose.models.PAbout || mongoose.model<IPAbout>('PAbout', PAboutSchema);

export default PAbout;