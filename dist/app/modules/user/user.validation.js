"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string().email('Invalid email address').optional(),
        phone: zod_1.z
            .string({ required_error: 'Phone number is required' })
            .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number (01xxxxxxxxx)'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters'),
        role: zod_1.z
            .enum(Object.values(user_constant_1.USER_ROLE))
            .default(user_constant_1.USER_ROLE.CUSTOMER),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z
            .string()
            .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number')
            .optional(),
        role: zod_1.z.enum(Object.values(user_constant_1.USER_ROLE)).optional(),
        status: zod_1.z.enum(['active', 'blocked', 'pending']).optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        avatar: zod_1.z.string().optional(),
    }),
});
const updateProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        avatar: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
    updateProfileValidationSchema,
};
