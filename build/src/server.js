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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const plant_routes_1 = __importDefault(require("./routes/plant-routes"));
const connection_1 = require("./database/connection");
const plant_seeder_1 = __importDefault(require("./database/seeders/plant-seeder"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    swaggerDefinition: {
        info: {
            title: "Dalia Express API",
            version: "1.0.0",
            description: "API documentation for Dalia Express",
        },
    },
    apis: ["./src/routes/plant-routes.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Build CRUD API with Node.js, Express and Sequelize",
    });
});
app.use("/api/plants", plant_routes_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Route: ${req.originalUrl} does not exist on this server`,
    });
});
const PORT = 8000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connectDatabase)();
    try {
        yield connection_1.dbInstance.sync({ force: false });
        yield (0, plant_seeder_1.default)();
        console.log("✅ Synced database and seeded plants successfully...");
    }
    catch (error) {
        console.error("❌ Error:", error);
    }
    console.log("🚀Server rocking on port 8000");
}));
