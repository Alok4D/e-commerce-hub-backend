"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidation = void 0;
const zod_1 = require("zod");
const updateSettingsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        rmbExchangeRate: zod_1.z.number().positive().optional(),
        shippingBufferRmb: zod_1.z.number().nonnegative().optional(),
        insideDhakaFee: zod_1.z.number().nonnegative().optional(),
        outsideDhakaFee: zod_1.z.number().nonnegative().optional(),
        freeShippingThreshold: zod_1.z.number().nonnegative().optional(),
        codEnabled: zod_1.z.boolean().optional(),
        bkashMerchantNumber: zod_1.z.string().optional(),
        supportPhone: zod_1.z.string().optional(),
        supportEmail: zod_1.z.string().email().optional(),
    }),
});
const createAuditLogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        action: zod_1.z.string({ required_error: 'Action is required' }),
        category: zod_1.z.string({ required_error: 'Category is required' }),
        details: zod_1.z.string({ required_error: 'Details are required' }),
    }),
});
exports.SettingsValidation = {
    updateSettingsValidationSchema,
    createAuditLogValidationSchema,
};
