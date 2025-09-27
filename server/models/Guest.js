import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["recruiter", "visitor"], required: true },
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
