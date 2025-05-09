import { catchAcync } from "../../utils/catchAcync";
import { bikeService } from "./bike.service";

const addBike = catchAcync(async (req, res) => {
  const result = await bikeService.addBikeIntoDB(req.body.data);
  res.status(200).json({
    success: true,
    message: " added bike successfully",
    data: result,
  });
});
const getAllBikes = catchAcync(async (req, res) => {
  const result = await bikeService.getAllBikesFromDB();
  res.status(200).json({
    success: true,
    message: "All bikes fetched successfully",
    data: result,
  });
});
const getBikeById = catchAcync(async (req, res) => {
  const result = await bikeService.getBikeByIdFromDB(req.params.bikeId);
  res.status(200).json({
    success: true,
    message: "All bikes fetched successfully",
    data: result,
  });
});
export const bikeController = { addBike, getAllBikes, getBikeById };
