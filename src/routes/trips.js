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
    const trips = await Trip.find();
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
    const trips = await Trip.find({ routeId: req.params.routeId });
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
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Trips for route and date
 */
router.get("/date", async (req, res) => {
  const { routeId, date } = req.query;
  try {
    const trips = await Trip.find({ routeId, date });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
