import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["recruiter", "visitor"], required: true },
  lastVisitedAt: { type: Date, default: Date.now },
  noOfVisits: { type: Number, default: 1 },
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
