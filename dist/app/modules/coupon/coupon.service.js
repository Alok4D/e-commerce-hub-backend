"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const coupon_model_1 = require("./coupon.model");
const createCouponIntoDB = async (payload) => {
    const isExist = await coupon_model_1.Coupon.findOne({ code: payload.code.toUpperCase(), isDeleted: false });
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon code already exists!');
    }
    const result = await coupon_model_1.Coupon.create({
        ...payload,
        code: payload.code.toUpperCase(),
    });
    return result;
};
const getAllCouponsFromDB = async () => {
    const result = await coupon_model_1.Coupon.find({ isDeleted: false }).sort('-createdAt');
    return result;
};
const applyCoupon = async (code, orderSubtotal) => {
    const coupon = await coupon_model_1.Coupon.findOne({
        code: code.toUpperCase(),
        isDeleted: false,
        isActive: true,
    });
    if (!coupon) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid or expired coupon code!');
    }
    // Check expiration
    if (new Date() > new Date(coupon.validUntil)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This coupon code has expired!');
    }
    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This coupon code has reached its usage limit!');
    }
    // Check minimum order amount
    if (orderSubtotal < coupon.minOrderAmount) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Minimum order of ৳${coupon.minOrderAmount} required for this coupon!`);
    }
    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'FIXED') {
        discount = coupon.discountAmount;
    }
    else {
        discount = (orderSubtotal * coupon.discountAmount) / 100;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
        }
    }
    discount = Math.min(discount, orderSubtotal);
    return {
        valid: true,
        code: coupon.code,
        discountAmount: Math.round(discount),
        message: `৳${Math.round(discount)} discount applied via code ${coupon.code}`,
    };
};
const deleteCouponFromDB = async (id) => {
    const result = await coupon_model_1.Coupon.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found!');
    }
    return result;
};
exports.CouponServices = {
    createCouponIntoDB,
    getAllCouponsFromDB,
    applyCoupon,
    deleteCouponFromDB,
};
