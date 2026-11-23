"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const customer_service_1 = require("./customer.service");
const createCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.CustomerServices.createCustomerIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Customer created successfully',
        data: result,
    });
});
const getAllCustomers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.CustomerServices.getAllCustomersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customers retrieved successfully',
        data: result,
    });
});
const getSingleCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await customer_service_1.CustomerServices.getSingleCustomerFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer 360 profile retrieved successfully',
        data: result,
    });
});
const updateCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await customer_service_1.CustomerServices.updateCustomerIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer updated successfully',
        data: result,
    });
});
const addNote = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const staffName = req.user?.userId || 'Staff';
    const result = await customer_service_1.CustomerServices.addCustomerNoteIntoDB(id, req.body.text, staffName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Note logged successfully',
        data: result,
    });
});
const addFollowUp = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await customer_service_1.CustomerServices.addFollowUpIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Follow-up task scheduled successfully',
        data: result,
    });
});
const toggleFollowUp = (0, catchAsync_1.default)(async (req, res) => {
    const { id, followUpId } = req.params;
    const result = await customer_service_1.CustomerServices.toggleFollowUpStatusIntoDB(id, followUpId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Follow-up status toggled successfully',
        data: result,
    });
});
const getPendingFollowUps = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.CustomerServices.getAllPendingFollowUpsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pending follow-ups retrieved successfully',
        data: result,
    });
});
exports.CustomerControllers = {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    addNote,
    addFollowUp,
    toggleFollowUp,
    getPendingFollowUps,
};
