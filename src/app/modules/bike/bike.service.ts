import { PrismaClient } from "@prisma/client";
import { AppError } from "../../middleware/globalErrorHandler";
const prisma = new PrismaClient();

const addBikeIntoDB = async (payload: any) => {
  const result = await prisma.bike.createMany({ data: payload });
  return result;
};
const getAllBikesFromDB = async () => {
  const result = await prisma.bike.findMany();
  return result;
};
const getBikeByIdFromDB = async (bikeId: string) => {
  const result = await prisma.bike.findUnique({ where: { bikeId } });
  if (!result) {
    throw new AppError(404, "Bike not found");
  }
  return result;
};
export const bikeService = {
  addBikeIntoDB,
  getAllBikesFromDB,
  getBikeByIdFromDB,
};
