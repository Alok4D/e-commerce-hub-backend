import { z } from 'zod';

const updateSettingsValidationSchema = z.object({
  body: z.object({
    rmbExchangeRate: z.number().positive().optional(),
    shippingBufferRmb: z.number().nonnegative().optional(),
    insideDhakaFee: z.number().nonnegative().optional(),
    outsideDhakaFee: z.number().nonnegative().optional(),
    freeShippingThreshold: z.number().nonnegative().optional(),
    codEnabled: z.boolean().optional(),
    bkashMerchantNumber: z.string().optional(),
    supportPhone: z.string().optional(),
    supportEmail: z.string().email().optional(),
  }),
});

const createAuditLogValidationSchema = z.object({
  body: z.object({
    action: z.string({ required_error: 'Action is required' }),
    category: z.string({ required_error: 'Category is required' }),
    details: z.string({ required_error: 'Details are required' }),
  }),
});

export const SettingsValidation = {
  updateSettingsValidationSchema,
  createAuditLogValidationSchema,
};
