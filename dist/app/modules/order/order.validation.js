"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z.object({
            name: zod_1.z.string({ required_error: 'Customer name is required' }),
            phone: zod_1.z
                .string({ required_error: 'Customer phone is required' })
                .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
            email: zod_1.z.string().email().optional(),
            address: zod_1.z.string({ required_error: 'Delivery address is required' }),
            city: zod_1.z.string().default('Dhaka'),
        }),
        items: zod_1.z
            .array(zod_1.z.object({
            productId: zod_1.z.string({ required_error: 'Product ID is required' }),
            title: zod_1.z.string({ required_error: 'Product title is required' }),
            price: zod_1.z.number().nonnegative(),
            quantity: zod_1.z.number().positive(),
            image: zod_1.z.string().optional(),
            variant: zod_1.z.string().optional(),
            sku: zod_1.z.string().optional(),
        }))
            .min(1, 'Order must contain at least one item'),
        subtotal: zod_1.z.number().nonnegative(),
        deliveryFee: zod_1.z.number().nonnegative().default(60),
        discount: zod_1.z.number().nonnegative().default(0),
        couponCode: zod_1.z.string().optional(),
        total: zod_1.z.number().nonnegative(),
        paymentMethod: zod_1.z.enum(order_constant_1.PaymentMethodList).default('COD'),
        notes: zod_1.z.string().optional(),
    }),
});
const updateOrderStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderStatus: zod_1.z.enum(order_constant_1.OrderStatusList).optional(),
        paymentStatus: zod_1.z.enum(order_constant_1.PaymentStatusList).optional(),
        courier: zod_1.z
            .object({
            name: zod_1.z.enum(['Pathao', 'Steadfast', 'RedX', 'Paperfly', 'Self']),
            trackingCode: zod_1.z.string().optional(),
            consignmentId: zod_1.z.string().optional(),
            status: zod_1.z.string().optional(),
        })
            .optional(),
        note: zod_1.z.string().optional(),
    }),
});
const cancelOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        reason: zod_1.z.string({ required_error: 'Cancellation reason is required' }).min(3),
    }),
});
const returnOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        reason: zod_1.z.string({ required_error: 'Return reason is required' }).min(3),
    }),
});
exports.OrderValidation = {
    createOrderValidationSchema,
    updateOrderStatusValidationSchema,
    cancelOrderValidationSchema,
    returnOrderValidationSchema,
};
