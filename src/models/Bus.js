import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  capacity: Number,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  lat: Number,
  lng: Number,
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" }
});

export default mongoose.model("Bus", busSchema);
