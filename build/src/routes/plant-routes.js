"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const plant_controller_1 = require("../controllers/plant-controller");
const plant_schema_1 = require("../middleware/plant.schema");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/plants:
 *   get:
 *     summary: Get a list of all plants
 *     tags: [Plants]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of plants to retrieve
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: List of plants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 *   post:
 *     summary: Create a new plant
 *     tags: [Plants]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Example request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Monstera
 *             category:
 *               type: string
 *               example: Foliage
 *             image:
 *               type: string
 *               example: https://unsplash.com/photos/JKnETI-aoXI
 *     responses:
 *       201:
 *         description: The created plant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 */
router
    .route("/")
    .get(plant_controller_1.findAllPlants)
    .post((0, validate_1.validate)(plant_schema_1.createPlantSchema), plant_controller_1.createPlant);
/**
 * @swagger
 * /api/plants/{plantId}:
 *   get:
 *     summary: Get a plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the plant to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: The plant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *   patch:
 *     summary: Update a plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the plant to update
 *       - in: body
 *         name: body
 *         description: Example request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Monstera
 *             category:
 *               type: string
 *               example: Foliage
 *             image:
 *               type: string
 *               example: https://unsplash.com/photos/JKnETI-aoXI
 *     responses:
 *       200:
 *         description: The updated plant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *   delete:
 *     summary: Delete a plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the plant to delete
 *         example: 1
 *     responses:
 *       204:
 *         description: Plant successfully deleted.
 */
router
    .route("/:plantId")
    .get(plant_controller_1.findPlant)
    .patch((0, validate_1.validate)(plant_schema_1.updatePlantSchema), plant_controller_1.updatePlant)
    .delete(plant_controller_1.deletePlant);
exports.default = router;
