import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Coupon code is required' }),
    discountType: z.enum(['FIXED', 'PERCENTAGE']).default('FIXED'),
    discountAmount: z.number({ required_error: 'Discount amount is required' }).positive(),
    minOrderAmount: z.number().nonnegative().default(0),
    maxDiscount: z.number().positive().optional(),
    validUntil: z.string({ required_error: 'Validity date is required' }),
    usageLimit: z.number().positive().optional(),
    isActive: z.boolean().default(true),
  }),
});

const applyCouponValidationSchema = z.object({
  body: z.object({
    code: z.string({ required_error: 'Coupon code is required' }),
    orderSubtotal: z.number({ required_error: 'Subtotal is required' }).nonnegative(),
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
  applyCouponValidationSchema,
};
