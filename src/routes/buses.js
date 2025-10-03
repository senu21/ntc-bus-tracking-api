import express from "express";
import Bus from "../models/Bus.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: Bus information
 */

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of buses
 */
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /buses/route/{routeId}:
 *   get:
 *     summary: Get buses by route
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buses for a route
 */
router.get("/route/:routeId", async (req, res) => {
  try {
    const buses = await Bus.find({ route: req.params.routeId });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
