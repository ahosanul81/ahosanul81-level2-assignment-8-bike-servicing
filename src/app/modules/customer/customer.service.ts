import { PrismaClient } from "@prisma/client";
import { AppError } from "../../middleware/globalErrorHandler";

const prisma = new PrismaClient();

const createCustomerIntoDB = async (payload: any) => {
  try {
    const result = await prisma.customer.createMany({ data: payload });
    return result;
  } catch (error: any) {
    throw new AppError(500, error.message);
  }
};

const getAllCustomerFromDB = async () => {
  const result = await prisma.customer.findMany();
  return result;
};
const getCustomerByIdFromDB = async (id: string) => {
  const result = await prisma.customer.findUnique({
    where: { customerId: id },
  });
  if (!result) {
    throw new AppError(404, "Customer not found");
  }
  return result;
};
const updateCustomerByIdFromDB = async (id: string, payload: string) => {
  const isExistCustomer = await prisma.customer.findUnique({
    where: { customerId: id },
  });

  if (!isExistCustomer) {
    throw new AppError(404, "Customer not found");
  }

  const result = await prisma.customer.update({
    where: { customerId: id },
    data: payload,
  });
  return result;
};
const deleteCustomerByIdFromDB = async (id: string) => {
  const isExistCustomer = await prisma.customer.findUnique({
    where: { customerId: id },
  });

  if (!isExistCustomer) {
    throw new AppError(404, "Customer not found");
  }

  const result = await prisma.customer.delete({
    where: { customerId: id },
  });
  return result;
};
export const customerService = {
  createCustomerIntoDB,
  getAllCustomerFromDB,
  getCustomerByIdFromDB,
  updateCustomerByIdFromDB,
  deleteCustomerByIdFromDB,
};
