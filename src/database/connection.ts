require("dotenv").config();
import { Sequelize } from "sequelize-typescript";
import { Plant } from "../models/plant";
import seedPlants from "../database/seeders/plant-seeder";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(POSTGRES_URL);
sequelize.addModels([Plant]);

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection has been established successfully.");
        sequelize.sync({ force: true }).then(() => {
          console.log("✅Synced database successfully...");
          seedPlants();
        })

      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
}

export default connectDatabase;