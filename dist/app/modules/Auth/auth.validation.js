"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        identifier: zod_1.z.string({ required_error: 'Phone or Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        phone: zod_1.z
            .string({ required_error: 'Phone number is required' })
            .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
        email: zod_1.z.string().email('Invalid email address').optional(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters'),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
    }),
});
const verifyPhoneValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z.string({ required_error: 'Phone number is required' }),
        otp: zod_1.z.string({ required_error: 'OTP is required' }).length(6, 'OTP must be 6 digits'),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is required' }),
        newPassword: zod_1.z.string({ required_error: 'New password is required' }).min(6),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required!' }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
    verifyPhoneValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
};
