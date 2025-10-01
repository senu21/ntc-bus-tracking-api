import mongoose from "mongoose";
import dotenv from "dotenv";
import Route from "../src/models/Route.js";
import Bus from "../src/models/Bus.js";
import Trip from "../src/models/Trip.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear old data
    await Route.deleteMany();
    await Bus.deleteMany();
    await Trip.deleteMany();

    // Add routes
    const routes = await Route.insertMany([
      { name: "Colombo - Kandy", distance: 115, fare: 500 },
      { name: "Colombo - Galle", distance: 120, fare: 450 },
      { name: "Colombo - Jaffna", distance: 400, fare: 1200 },
      { name: "Colombo - Anuradhapura", distance: 200, fare: 700 },
      { name: "Colombo - Trincomalee", distance: 260, fare: 900 }
    ]);

    // Add buses (5 buses per route)
    const buses = [];
    routes.forEach(route => {
      for (let i = 1; i <= 5; i++) {
        buses.push({
          number: `${route.name.split(" ")[0]}-${i}`,
          capacity: 50,
          status: "active",
          lat: 6.9271 + Math.random() * 0.1,
          lng: 79.8612 + Math.random() * 0.1,
          route: route._id
        });
      }
    });
    const busDocs = await Bus.insertMany(buses);

    // Add trips (for 7 days, 3 schedules/day)
    const trips = [];
    const schedules = ["morning", "afternoon", "evening"];
    const today = new Date();

    for (let d = 0; d < 7; d++) {
      const tripDate = new Date(today);
      tripDate.setDate(today.getDate() + d);

      busDocs.forEach(bus => {
        schedules.forEach(s => {
          trips.push({
            date: tripDate,
            schedule: s,
            bus: bus._id,
            route: bus.route
          });
        });
      });
    }
    await Trip.insertMany(trips);

    console.log(" Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();
