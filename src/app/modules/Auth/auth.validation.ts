import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    identifier: z.string({ required_error: 'Phone or Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
    email: z.string().email('Invalid email address').optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

const verifyPhoneValidationSchema = z.object({
  body: z.object({
    phone: z.string({ required_error: 'Phone number is required' }),
    otp: z.string({ required_error: 'OTP is required' }).length(6, 'OTP must be 6 digits'),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }).min(6),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  verifyPhoneValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
