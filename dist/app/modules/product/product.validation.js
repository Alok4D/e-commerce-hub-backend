"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const product_constant_1 = require("./product.constant");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        slug: zod_1.z.string({ required_error: 'Slug is required' }),
        sku: zod_1.z.string({ required_error: 'SKU is required' }),
        category: zod_1.z.string({ required_error: 'Category is required' }),
        subCategory: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        price: zod_1.z.number({ required_error: 'Price is required' }).nonnegative(),
        regularPrice: zod_1.z.number({ required_error: 'Regular price is required' }).nonnegative(),
        costPriceRMB: zod_1.z.number().default(0),
        costPriceBDT: zod_1.z.number().default(0),
        grossMarginPercent: zod_1.z.number().default(0),
        stock: zod_1.z.number({ required_error: 'Stock is required' }).nonnegative(),
        status: zod_1.z.enum(product_constant_1.ProductStatusList).default('ACTIVE'),
        incomingDate: zod_1.z.string().datetime().optional().nullable(),
        wholesaleTiers: zod_1.z
            .array(zod_1.z.object({
            minQty: zod_1.z.number().positive(),
            unitPrice: zod_1.z.number().positive(),
        }))
            .default([]),
        variants: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            sku: zod_1.z.string(),
            price: zod_1.z.number(),
            stock: zod_1.z.number(),
            attributes: zod_1.z.record(zod_1.z.string()).optional(),
        }))
            .default([]),
        specs: zod_1.z
            .array(zod_1.z.object({
            key: zod_1.z.string(),
            value: zod_1.z.string(),
        }))
            .default([]),
        images: zod_1.z.array(zod_1.z.string()).default([]),
        thumbnail: zod_1.z.string().default(''),
        description: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        isFeatured: zod_1.z.boolean().default(false),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        sku: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        subCategory: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        price: zod_1.z.number().nonnegative().optional(),
        regularPrice: zod_1.z.number().nonnegative().optional(),
        costPriceRMB: zod_1.z.number().optional(),
        costPriceBDT: zod_1.z.number().optional(),
        grossMarginPercent: zod_1.z.number().optional(),
        stock: zod_1.z.number().nonnegative().optional(),
        status: zod_1.z.enum(product_constant_1.ProductStatusList).optional(),
        incomingDate: zod_1.z.string().datetime().optional().nullable(),
        wholesaleTiers: zod_1.z
            .array(zod_1.z.object({
            minQty: zod_1.z.number(),
            unitPrice: zod_1.z.number(),
        }))
            .optional(),
        variants: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            sku: zod_1.z.string(),
            price: zod_1.z.number(),
            stock: zod_1.z.number(),
            attributes: zod_1.z.record(zod_1.z.string()).optional(),
        }))
            .optional(),
        specs: zod_1.z
            .array(zod_1.z.object({
            key: zod_1.z.string(),
            value: zod_1.z.string(),
        }))
            .optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        videoUrl: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        isFeatured: zod_1.z.boolean().optional(),
    }),
});
exports.ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
