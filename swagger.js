import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NTC Bus Tracking API",
      version: "1.0.0",
      description: "REST API for tracking buses, routes, and trips for NTC Sri Lanka",
    },
    servers: [
      {
        url: "https://ntc-bus-tracking-api-jyqx.onrender.com", // ✅ Render deployment
        description: "Production server",
      },
      {
        url: "http://localhost:5000", // ✅ Local dev
        description: "Local development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // adjust if your routes are in src/routes
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
