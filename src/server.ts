require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser"
import plantRouter from "./routes/plant-routes";
import { connectDatabase, dbInstance } from "./database/connection";
import seedPlants from "./database/seeders/plant-seeder";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

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

app.use(bodyParser.json());

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
  	})
);

app.get("/api/healthchecker", (req: Request, res: Response) => {
	res.status(200).json({
    	status: "success",
    	message: "Build CRUD API with Node.js, Express and Sequelize",
  });
});

app.use("/api/plants", plantRouter);

app.all("*", (req: Request, res: Response) => {
	res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});

const PORT = 8000;
app.listen(PORT, async () => {
  await connectDatabase();
	try {
		await dbInstance.sync({ force: false });
		await seedPlants();
		console.log("✅ Synced database and seeded plants successfully...");
	} catch (error) {
		console.error("❌ Error:", error);
	}
	console.log("🚀Server rocking on port 8000");
});