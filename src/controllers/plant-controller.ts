import { Request, Response } from "express";
import { Plant } from "../database/models/plant";

import {
  CreatePlantInput,
  FilterQueryInput,
  ParamsInput,
  UpdatePlantInput,
} from "../middleware/plant.schema";

export const createPlant = async (
    req: Request<{}, {}, CreatePlantInput>,
    res: Response
  ) => {
    try {
      const { name, image, category } = req.body;
      const plant = await Plant.create({
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
    } catch (error: any) {
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
  };

  //update plant
  export const updatePlant = async (
    req: Request<{plantId: string}, {}, UpdatePlantInput>,
    res: Response
  ) => {
    try {
      const result = await Plant.update(
        { ...req.body, updatedAt: Date.now() },
        {
          where: {
            id: req.params.plantId,
          },
        }
      );
  
      if (result[0] === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Plant with that ID not found",
        });
      }
  
      const plant = await Plant.findByPk(req.params.plantId);
  
      res.status(200).json({
        status: "success",
        data: {
          plant,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
  //findPlant
  export const findPlant = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const plant = await Plant.findByPk(req.params.plantId);
  
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
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };  

  //findall
  export const findAllPlants = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response
  ) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;
  
      const plants = await Plant.findAll({ limit, offset: skip });
  
      res.status(200).json({
        status: "success",
        results: plants.length,
        plants,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
  //Delete plant 

  export const deletePlant = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const result = await Plant.destroy({
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
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  