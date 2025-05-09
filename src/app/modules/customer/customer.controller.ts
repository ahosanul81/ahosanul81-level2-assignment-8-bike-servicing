import { catchAcync } from "../../utils/catchAcync";
import { customerService } from "./customer.service";

const createCustomer = catchAcync(async (req, res) => {
  const result = await customerService.createCustomerIntoDB(req.body.data);
  res.status(200).json({
    success: true,
    message: "added a customer successfully",
    data: result,
  });
});

const getAllCustomer = catchAcync(async (req, res) => {
  const result = await customerService.getAllCustomerFromDB();
  res.status(200).json({
    success: true,
    message: "All customer fetched successfully",
    data: result,
  });
});
const getCustomerById = catchAcync(async (req, res) => {
  const result = await customerService.getCustomerByIdFromDB(
    req.params.customerId
  );
  res.status(200).json({
    success: true,
    message: " customer fetched by id successfully",
    data: result,
  });
});
const updateCustomerById = catchAcync(async (req, res) => {
  const result = await customerService.updateCustomerByIdFromDB(
    req.params.customerId,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Updated_customer by id successfully",
    data: result,
  });
});
const deleteCustomerById = catchAcync(async (req, res) => {
  const result = await customerService.deleteCustomerByIdFromDB(
    req.params.customerId
  );
  res.status(200).json({
    success: true,
    message: "Deleted_customer successfully",
    data: result,
  });
});

export const customerController = {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
