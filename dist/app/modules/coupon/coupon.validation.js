"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidation = void 0;
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({ required_error: 'Coupon code is required' }),
        discountType: zod_1.z.enum(['FIXED', 'PERCENTAGE']).default('FIXED'),
        discountAmount: zod_1.z.number({ required_error: 'Discount amount is required' }).positive(),
        minOrderAmount: zod_1.z.number().nonnegative().default(0),
        maxDiscount: zod_1.z.number().positive().optional(),
        validUntil: zod_1.z.string({ required_error: 'Validity date is required' }),
        usageLimit: zod_1.z.number().positive().optional(),
        isActive: zod_1.z.boolean().default(true),
    }),
});
const applyCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({ required_error: 'Coupon code is required' }),
        orderSubtotal: zod_1.z.number({ required_error: 'Subtotal is required' }).nonnegative(),
    }),
});
exports.CouponValidation = {
    createCouponValidationSchema,
    applyCouponValidationSchema,
};
