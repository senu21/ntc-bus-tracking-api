import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip schedules
 */

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of all trips
 */
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().populate("bus route");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /trips/route/{routeId}:
 *   get:
 *     summary: Get trips for a specific route
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trips for a route
 */
router.get("/route/:routeId", async (req, res) => {
  try {
    const trips = await Trip.find({ route: req.params.routeId }).populate("bus route");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /trips/date:
 *   get:
 *     summary: Get trips for a specific route and date
 *     tags: [Trips]
 *     parameters:
 *       - in: query
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The route ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Trips for route and date
 */
router.get("/date", async (req, res) => {
  const { routeId, date } = req.query;

  if (!routeId || !date) {
    return res.status(400).json({ error: "routeId and date are required" });
  }

  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const trips = await Trip.find({
      route: routeId,
      date: { $gte: start, $lt: end }
    }).populate("bus route");

    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
