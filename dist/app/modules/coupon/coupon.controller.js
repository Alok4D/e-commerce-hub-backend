"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const coupon_service_1 = require("./coupon.service");
const createCoupon = (0, catchAsync_1.default)(async (req, res) => {
    const result = await coupon_service_1.CouponServices.createCouponIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Coupon created successfully',
        data: result,
    });
});
const getAllCoupons = (0, catchAsync_1.default)(async (req, res) => {
    const result = await coupon_service_1.CouponServices.getAllCouponsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Coupons retrieved successfully',
        data: result,
    });
});
const applyCoupon = (0, catchAsync_1.default)(async (req, res) => {
    const { code, orderSubtotal } = req.body;
    const result = await coupon_service_1.CouponServices.applyCoupon(code, orderSubtotal);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result.message,
        data: result,
    });
});
const deleteCoupon = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await coupon_service_1.CouponServices.deleteCouponFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Coupon deleted successfully',
        data: result,
    });
});
exports.CouponControllers = {
    createCoupon,
    getAllCoupons,
    applyCoupon,
    deleteCoupon,
};
