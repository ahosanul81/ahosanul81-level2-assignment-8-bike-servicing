"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../utils/validateRequest");
const bike_validation_1 = require("./bike.validation");
const bike_controller_1 = require("./bike.controller");
const bikeRouter = express_1.default.Router();
bikeRouter.post("/", (0, validateRequest_1.validateRequest)(bike_validation_1.bikevalidation.add), bike_controller_1.bikeController.addBike);
bikeRouter.get("/", bike_controller_1.bikeController.getAllBikes);
bikeRouter.get("/:bikeId", bike_controller_1.bikeController.getBikeById);
exports.default = bikeRouter;
