import { z } from 'zod';

const createCustomerValidationSchema = z.object({
  body: z.object({
    phone: z
      .string({ required_error: 'Phone number is required' })
      .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    tags: z.array(z.string()).default(['New Customer']),
  }),
});

const updateCustomerValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const addNoteValidationSchema = z.object({
  body: z.object({
    text: z.string({ required_error: 'Note content is required' }),
  }),
});

const addFollowUpValidationSchema = z.object({
  body: z.object({
    dueDate: z.string({ required_error: 'Due date is required' }),
    task: z.string({ required_error: 'Task description is required' }),
    assignee: z.string().default('Sales Team'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  }),
});

export const CustomerValidation = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
  addNoteValidationSchema,
  addFollowUpValidationSchema,
};
