import { Router } from "express";

import { validate } from "../middleware/validate";
import {
  createPlant,
  deletePlant,
  findAllPlants,
  findPlant,
  updatePlant,
} from "../controllers/plant-controller";
import { createPlantSchema, updatePlantSchema } from "../middleware/plant.schema";

const router = Router();

router
  .route("/")
  .get(findAllPlants)
  .post(validate(createPlantSchema), createPlant);
router
  .route("/:plantId")
  .get(findPlant)
  .patch(validate(updatePlantSchema), updatePlant)
  .delete(deletePlant);

export default router;