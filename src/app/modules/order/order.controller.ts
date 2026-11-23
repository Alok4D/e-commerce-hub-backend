import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user ? req.user.userId : undefined;
  const result = await OrderServices.createOrderIntoDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await OrderServices.getMyOrdersFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const staffName = req.user?.userId || 'Staff';
  const result = await OrderServices.updateOrderStatusIntoDB(id, req.body, staffName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

const cancelOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const staffOrUser = req.user?.userId || 'User';
  const result = await OrderServices.cancelOrderIntoDB(id, req.body.reason, staffOrUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order cancelled successfully',
    data: result,
  });
});

const returnOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const staffName = req.user?.userId || 'Staff';
  const result = await OrderServices.returnOrderIntoDB(id, req.body.reason, staffName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order return processed successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  cancelOrder,
  returnOrder,
};
