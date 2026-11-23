"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const analytics_service_1 = require("./analytics.service");
const getDashboardOverview = (0, catchAsync_1.default)(async (req, res) => {
    const result = await analytics_service_1.AnalyticsServices.getDashboardOverviewData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dashboard overview analytics retrieved successfully',
        data: result,
    });
});
exports.AnalyticsControllers = {
    getDashboardOverview,
};
