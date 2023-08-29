"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlant = exports.findAllPlants = exports.findPlant = exports.updatePlant = exports.createPlant = void 0;
const plant_1 = require("../database/models/plant");
const createPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, category } = req.body;
        const plant = yield plant_1.Plant.create({
            name,
            image,
            category,
        });
        res.status(201).json({
            status: "success",
            data: {
                plant,
            },
        });
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "Plant with that name already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.createPlant = createPlant;
//update plant
const updatePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield plant_1.Plant.update(Object.assign(Object.assign({}, req.body), { updatedAt: Date.now() }), {
            where: {
                id: req.params.plantId,
            },
        });
        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Name with that ID not found",
            });
        }
        const plant = yield plant_1.Plant.findByPk(req.params.plantId);
        res.status(200).json({
            status: "success",
            data: {
                plant,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.updatePlant = updatePlant;
//findPlant
const findPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plant = yield plant_1.Plant.findByPk(req.params.plantId);
        if (!plant) {
            return res.status(404).json({
                status: "fail",
                message: "Plant with that ID not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                plant,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.findPlant = findPlant;
//findall
const findAllPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const plants = yield plant_1.Plant.findAll({ limit, offset: skip });
        res.status(200).json({
            status: "success",
            results: plants.length,
            plants,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.findAllPlants = findAllPlants;
//Delete plant 
const deletePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield plant_1.Plant.destroy({
            where: { id: req.params.plantId },
            force: true,
        });
        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Plant with that ID not found",
            });
        }
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.deletePlant = deletePlant;
