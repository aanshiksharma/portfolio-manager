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
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  portfolioLink: { type: String, required: true },

  resumeLink: { type: String },

  about: { type: [String], default: [] },

  profileImage: { type: adminImageSchema },
  socialMediaLinks: { type: [socialMediaLinkSchema], default: [] },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
