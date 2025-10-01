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
        url: "https://your-domain.com", // update after deployment
      },
    ],
  },
  apis: ["./routes/*.js"], // <-- point to your route files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
