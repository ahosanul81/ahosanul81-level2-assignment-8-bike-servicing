import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { bikevalidation } from "./bike.validation";
import { bikeController } from "./bike.controller";
const bikeRouter = express.Router();

bikeRouter.post(
  "/add-bike",
  validateRequest(bikevalidation.add),
  bikeController.addBike
);
bikeRouter.get("/", bikeController.getAllBikes);
bikeRouter.get("/:bikeId", bikeController.getBikeById);

export default bikeRouter;
