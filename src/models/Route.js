import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: Number,
  fare: Number,
  coordinates: [[Number]]
});

export default mongoose.model("Route", routeSchema);
