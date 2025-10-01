import express from "express";
import Route from "../models/Route.js";

const router = express.Router();

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all bus routes
 *     tags:
 *       - Routes
 *     responses:
 *       200:
 *         description: List of routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   distance:
 *                     type: number
 *                   fare:
 *                     type: number
 */
router.get("/", async (req, res) => {
  const routes = await Route.find();
  res.json(routes);
});

export default router;
