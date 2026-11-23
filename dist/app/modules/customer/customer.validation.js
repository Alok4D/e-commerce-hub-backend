"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidation = void 0;
const zod_1 = require("zod");
const createCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z
            .string({ required_error: 'Phone number is required' })
            .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string().email().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).default(['New Customer']),
    }),
});
const updateCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const addNoteValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({ required_error: 'Note content is required' }),
    }),
});
const addFollowUpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        dueDate: zod_1.z.string({ required_error: 'Due date is required' }),
        task: zod_1.z.string({ required_error: 'Task description is required' }),
        assignee: zod_1.z.string().default('Sales Team'),
        priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    }),
});
exports.CustomerValidation = {
    createCustomerValidationSchema,
    updateCustomerValidationSchema,
    addNoteValidationSchema,
    addFollowUpValidationSchema,
};
