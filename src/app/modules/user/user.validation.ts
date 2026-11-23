import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email('Invalid email address').optional(),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number (01xxxxxxxxx)'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    role: z
      .enum(Object.values(USER_ROLE) as [string, ...string[]])
      .default(USER_ROLE.CUSTOMER),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number')
      .optional(),
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).optional(),
    status: z.enum(['active', 'blocked', 'pending']).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateProfileValidationSchema,
};
