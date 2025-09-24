import mongoose from "mongoose";

const socialMediaLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const adminImageSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    firebasePath: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const adminConfigSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  portfolioLink: { type: String, required: true },

  resumeLink: { type: String },

  about: { type: [String] },

  profileImage: { type: adminImageSchema },
  socialMediaLinks: { type: [socialMediaLinkSchema] },
});

const AdminConfig = mongoose.model("AdminConfig", adminConfigSchema);
export default AdminConfig;
