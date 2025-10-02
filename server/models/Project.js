import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skills: { type: [String], required: true },
  featured: { type: Boolean, default: false },
  description: { type: String },

  projectLink: { type: String },
  githubLink: { type: String },

  coverImage: { type: imageSchema, required: true },
  otherImages: { type: [imageSchema] },

  meta: {
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },

  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
