import { catchAcync } from "../../utils/catchAcync";
import { service } from "./service.service";

const createService = catchAcync(async (req, res) => {
  const result = await service.createServiceIntoDB(req.body.data);

  res.status(200).json({
    success: true,
    message: " created service successfully",
    data: result,
  });
});
const getAllServiceRecord = catchAcync(async (req, res) => {
  const result = await service.getAllServiceRecordFromDB();

  res.status(200).json({
    success: true,
    message: "all service fetched successfully",
    data: result,
  });
});
const getServiceRecordById = catchAcync(async (req, res) => {
  const result = await service.getServiceRecordByIdFromDB(req.params.serviceId);

  res.status(200).json({
    success: true,
    message: "all service fetched successfully",
    data: result,
  });
});
const updateStatus = catchAcync(async (req, res) => {
  const result = await service.updateStatusIntoDB(
    req.params.serviceId,
    req.body.status
  );

  res.status(200).json({
    success: true,
    message: "Service status updated successfully",
    data: result,
  });
});
const getServiceRecordByStatus = catchAcync(async (req, res) => {
  const result = await service.getServiceRecordByStatus(req.params.status);

  res.status(200).json({
    success: true,
    message: "Service fetched by status successfully",
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServiceRecord,
  getServiceRecordById,
  updateStatus,
  getServiceRecordByStatus,
};
