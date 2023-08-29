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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plant_1 = require("../models/plant");
const plant_data_1 = __importDefault(require("./plant-data"));
function seedPlants() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const plantData of plant_data_1.default) {
                yield plant_1.Plant.create({
                    name: plantData.name,
                    category: plantData.category,
                    image: plantData.image,
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = seedPlants;
