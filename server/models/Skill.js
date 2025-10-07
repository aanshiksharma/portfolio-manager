import mongoose, { mongo } from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  categoryName: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
