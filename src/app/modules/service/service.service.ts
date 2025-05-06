import { StatusCodes } from "http-status-codes";

import { AppError } from "../../middleware/globalErrorHandler";
import { Prisma, PrismaClient, serviceStatus } from "@prisma/client";

const prisma = new PrismaClient();

const createServiceIntoDB = async (payload: any) => {
  const isExistBike = await prisma.bike.findUnique({
    where: { bikeId: payload.bikeId },
  });
  if (!isExistBike) {
    throw new AppError(404, "Selected Bike not found");
  }
  const result = await prisma.service.create({ data: payload });
  return result;
};
const getAllServiceRecordFromDB = async () => {
  const result = await prisma.service.findMany({ include: { bike: true } });
  return result;
};
const getServiceRecordByIdFromDB = async (serviceId: string) => {
  console.log(serviceId);

  const isExistService = await prisma.service.findUnique({
    where: { serviceId },
  });
  if (!isExistService) {
    throw new AppError(404, "Selected service not found");
  }
  const result = await prisma.service.findUnique({
    where: { serviceId },
    include: { bike: true },
  });
  return result;
};

const updateStatusIntoDB = async (serviceId: string, status: string) => {
  const isExistService = await prisma.service.findUnique({
    where: { serviceId },
  });
  if (!isExistService) {
    throw new AppError(404, "Selected service not found");
  }
  if (
    isExistService.status === "COMPLETED" ||
    "REJECTED" ||
    "PENDING" ||
    "IN_PROGRESS"
  ) {
    throw new AppError(
      StatusCodes.CONFLICT,
      isExistService.status === "COMPLETED" || "REJECTED"
        ? ` Selected service already ${status}`
        : ` Selected service  ${status}`
    );
  }

  const result = await prisma.$transaction(
    async (transactionClient: Prisma.TransactionClient) => {
      const updateStatus = await transactionClient.service.update({
        where: { serviceId },
        data: {
          status: status as serviceStatus,
        },
        include: { bike: true },
      });
      const updateDate = await transactionClient.$queryRaw`UPDATE "Service"
        SET "completionDate" = NOW()
        WHERE "serviceId" = ${serviceId}`;

      return updateStatus;
    }
  );

  return result;
};

const getServiceRecordByStatus = async (status: string) => {
  if (
    (status && status.toUpperCase() === "COMPLETED") ||
    status.toUpperCase() === "REJECTED"
  ) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This route is only for pending or IN_PROGRESS services"
    );
  }
  const pendingOrInProgressService = await prisma.service.findMany({
    where: {
      status: status.toUpperCase() as serviceStatus,
    },
    orderBy: { serviceDate: "desc" },
    take: 1,
    include: { bike: true },
  });
  const result = await prisma.service.findMany({
    where: {
      OR: [{ status: "PENDING" }, { status: "IN_PROGRESS" }],
    },
    orderBy: { serviceDate: "desc" },

    include: { bike: true },
  });
  return result;
};
export const service = {
  createServiceIntoDB,
  getAllServiceRecordFromDB,
  getServiceRecordByIdFromDB,
  updateStatusIntoDB,
  getServiceRecordByStatus,
};
