import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { CustomerServices } from './customer.service';

const createCustomer = catchAsync(async (req, res) => {
  const result = await CustomerServices.createCustomerIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerServices.getAllCustomersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customers retrieved successfully',
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.getSingleCustomerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer 360 profile retrieved successfully',
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.updateCustomerIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer updated successfully',
    data: result,
  });
});

const addNote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const staffName = req.user?.userId || 'Staff';
  const result = await CustomerServices.addCustomerNoteIntoDB(id, req.body.text, staffName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Note logged successfully',
    data: result,
  });
});

const addFollowUp = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.addFollowUpIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow-up task scheduled successfully',
    data: result,
  });
});

const toggleFollowUp = catchAsync(async (req, res) => {
  const { id, followUpId } = req.params;
  const result = await CustomerServices.toggleFollowUpStatusIntoDB(id, followUpId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow-up status toggled successfully',
    data: result,
  });
});

const getPendingFollowUps = catchAsync(async (req, res) => {
  const result = await CustomerServices.getAllPendingFollowUpsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pending follow-ups retrieved successfully',
    data: result,
  });
});

export const CustomerControllers = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  addNote,
  addFollowUp,
  toggleFollowUp,
  getPendingFollowUps,
};
