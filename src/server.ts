require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDatabase, dbInstance } from "./database/connection";
import { Plant } from "./models/plant";
import seedPlants from "./database/seeders/plant-seeder";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Build CRUD API with Node.js, Express and Sequelize",
  });
});

app.get("/api/plants", async (req: Request, res: Response): Promise<Response> => {
  const allPlants: Plant[] = await Plant.findAll();
  return res.status(200).json(allPlants);
});

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