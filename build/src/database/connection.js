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
exports.dbInstance = exports.connectDatabase = void 0;
require("dotenv").config();
const sequelize_typescript_1 = require("sequelize-typescript");
const plant_1 = require("./models/plant");
const POSTGRES_URL = process.env.DATABASE_URL;
const dbInstance = new sequelize_typescript_1.Sequelize(POSTGRES_URL);
exports.dbInstance = dbInstance;
dbInstance.addModels([plant_1.Plant]);
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbInstance.authenticate();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.connectDatabase = connectDatabase;
