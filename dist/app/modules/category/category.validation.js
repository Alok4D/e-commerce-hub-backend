"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        slug: zod_1.z.string({ required_error: 'Slug is required' }),
        department: zod_1.z.string({ required_error: 'Department is required' }),
        subCategories: zod_1.z.array(zod_1.z.string()).default([]),
        icon: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        marketingTags: zod_1.z.array(zod_1.z.string()).default([]),
        specTemplates: zod_1.z
            .array(zod_1.z.object({
            fieldName: zod_1.z.string(),
            inputType: zod_1.z.enum(['text', 'number', 'select', 'boolean']).default('text'),
            required: zod_1.z.boolean().default(false),
            options: zod_1.z.array(zod_1.z.string()).optional(),
        }))
            .default([]),
        status: zod_1.z.enum(['ACTIVE', 'ARCHIVED']).default('ACTIVE'),
    }),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        subCategories: zod_1.z.array(zod_1.z.string()).optional(),
        icon: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        marketingTags: zod_1.z.array(zod_1.z.string()).optional(),
        specTemplates: zod_1.z
            .array(zod_1.z.object({
            fieldName: zod_1.z.string(),
            inputType: zod_1.z.enum(['text', 'number', 'select', 'boolean']).default('text'),
            required: zod_1.z.boolean().default(false),
            options: zod_1.z.array(zod_1.z.string()).optional(),
        }))
            .optional(),
        status: zod_1.z.enum(['ACTIVE', 'ARCHIVED']).optional(),
    }),
});
exports.CategoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
