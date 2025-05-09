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
exports.bikeController = void 0;
const catchAcync_1 = require("../../utils/catchAcync");
const bike_service_1 = require("./bike.service");
const addBike = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.addBikeIntoDB(req.body.data);
    res.status(200).json({
        success: true,
        message: " added bike successfully",
        data: result,
    });
}));
const getAllBikes = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.getAllBikesFromDB();
    res.status(200).json({
        success: true,
        message: "All bikes fetched successfully",
        data: result,
    });
}));
const getBikeById = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.bikeService.getBikeByIdFromDB(req.params.bikeId);
    res.status(200).json({
        success: true,
        message: "All bikes fetched successfully",
        data: result,
    });
}));
exports.bikeController = { addBike, getAllBikes, getBikeById };
