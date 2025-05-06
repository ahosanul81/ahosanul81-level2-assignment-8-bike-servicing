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
exports.serviceController = void 0;
const catchAcync_1 = require("../../utils/catchAcync");
const service_service_1 = require("./service.service");
const createService = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.service.createServiceIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: " created service successfully",
        data: result,
    });
}));
const getAllServiceRecord = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.service.getAllServiceRecordFromDB();
    res.status(200).json({
        success: true,
        message: "all service fetched successfully",
        data: result,
    });
}));
const getServiceRecordById = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.service.getServiceRecordByIdFromDB(req.params.serviceId);
    res.status(200).json({
        success: true,
        message: "all service fetched successfully",
        data: result,
    });
}));
const updateStatus = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.service.updateStatusIntoDB(req.params.serviceId, req.body.status);
    res.status(200).json({
        success: true,
        message: "Service status updated successfully",
        data: result,
    });
}));
const getServiceRecordByStatus = (0, catchAcync_1.catchAcync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.service.getServiceRecordByStatus(req.params.status);
    res.status(200).json({
        success: true,
        message: "Service fetched by status successfully",
        data: result,
    });
}));
exports.serviceController = {
    createService,
    getAllServiceRecord,
    getServiceRecordById,
    updateStatus,
    getServiceRecordByStatus,
};
