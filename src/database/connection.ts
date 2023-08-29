require("dotenv").config();
import { Sequelize } from "sequelize-typescript";
import { Plant } from "./models/plant";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const dbInstance = new Sequelize(POSTGRES_URL);

dbInstance.addModels([Plant]);

async function connectDatabase() {
	try {
		await dbInstance.authenticate();
	} catch (error) {
		throw error;
	}
}

export { connectDatabase, dbInstance };