import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import routeRoutes from "./routes/routes.js";
import busRoutes from "./routes/buses.js";
import tripRoutes from "./routes/trips.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ SWAGGER SETUP ------------------
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NTC Bus Tracking API",
      version: "1.0.0",
      description: "API for NTC Bus Tracking system",
    },
    servers: [{ url: "https://ntc-bus-tracking-api-jyqx.onrender.com" }],
  },
  apis: ["./src/routes/*.js"], // adjust path if your route files are in src/routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ------------------ ROUTES ------------------
app.use("/routes", routeRoutes);
app.use("/buses", busRoutes);
app.use("/trips", tripRoutes);

// ------------------ MONGODB ------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
