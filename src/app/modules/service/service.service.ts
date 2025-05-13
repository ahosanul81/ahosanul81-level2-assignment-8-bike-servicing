import { StatusCodes } from "http-status-codes";

import { AppError } from "../../middleware/globalErrorHandler";
import { Prisma, PrismaClient, serviceStatus } from "@prisma/client";

const prisma = new PrismaClient();

const createServiceIntoDB = async (payload: any) => {
  // console.log(payload);
  // const bikeIds = payload?.map(
  //   (item: { bikeId: string; description: string }) => {
  //     return item.bikeId;
  //   }
  // );
  // const existingBikeIdsInDB = await prisma.bike.groupBy({
  //   by: ["bikeId"],
  //   where: {
  //     bikeId: {
  //       in: bikeIds,
  //     },
  //   },
  // });
  // const existingBikeIds = existingBikeIdsInDB?.map(
  //   (item: { bikeId: string }) => {
  //     return item.bikeId;
  //   }
  // );
  // if (!existingBikeIds.includes(bikeIds)) {
  // }
  // console.log(existingBikeIds);
  // if (!isExistBike) {
  //   throw new AppError(404, "Selected Bike not found");
  // }
  try {
    if (
      !(await prisma.bike.findUnique({ where: { bikeId: payload.bikeId } }))
    ) {
      throw new AppError(404, "Bike  not found");
    }
    const result = await prisma.service.create({ data: payload });
    return result;
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
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
  console.log(isExistService.status);

  if (
    isExistService.status === "COMPLETED" ||
    isExistService.status === "REJECTED"
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
