import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  schedule: { type: String, enum: ["morning", "afternoon", "evening"] },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" }
});

export default mongoose.model("Trip", tripSchema);
