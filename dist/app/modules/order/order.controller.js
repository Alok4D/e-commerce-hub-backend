"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user ? req.user.userId : undefined;
    const result = await order_service_1.OrderServices.createOrderIntoDB(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
});
const getAllOrders = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderServices.getAllOrdersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
});
const getMyOrders = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await order_service_1.OrderServices.getMyOrdersFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My orders retrieved successfully',
        data: result,
    });
});
const getSingleOrder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await order_service_1.OrderServices.getSingleOrderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully',
        data: result,
    });
});
const updateOrderStatus = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const staffName = req.user?.userId || 'Staff';
    const result = await order_service_1.OrderServices.updateOrderStatusIntoDB(id, req.body, staffName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
});
const cancelOrder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const staffOrUser = req.user?.userId || 'User';
    const result = await order_service_1.OrderServices.cancelOrderIntoDB(id, req.body.reason, staffOrUser);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order cancelled successfully',
        data: result,
    });
});
const returnOrder = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const staffName = req.user?.userId || 'Staff';
    const result = await order_service_1.OrderServices.returnOrderIntoDB(id, req.body.reason, staffName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order return processed successfully',
        data: result,
    });
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getMyOrders,
    getSingleOrder,
    updateOrderStatus,
    cancelOrder,
    returnOrder,
};
