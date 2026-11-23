import { z } from 'zod';
import { ProductStatusList } from './product.constant';

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    slug: z.string({ required_error: 'Slug is required' }),
    sku: z.string({ required_error: 'SKU is required' }),
    category: z.string({ required_error: 'Category is required' }),
    subCategory: z.string().optional(),
    tags: z.array(z.string()).default([]),
    price: z.number({ required_error: 'Price is required' }).nonnegative(),
    regularPrice: z.number({ required_error: 'Regular price is required' }).nonnegative(),
    costPriceRMB: z.number().default(0),
    costPriceBDT: z.number().default(0),
    grossMarginPercent: z.number().default(0),
    stock: z.number({ required_error: 'Stock is required' }).nonnegative(),
    status: z.enum(ProductStatusList).default('ACTIVE'),
    incomingDate: z.string().datetime().optional().nullable(),
    wholesaleTiers: z
      .array(
        z.object({
          minQty: z.number().positive(),
          unitPrice: z.number().positive(),
        }),
      )
      .default([]),
    variants: z
      .array(
        z.object({
          name: z.string(),
          sku: z.string(),
          price: z.number(),
          stock: z.number(),
          attributes: z.record(z.string()).optional(),
        }),
      )
      .default([]),
    specs: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
    images: z.array(z.string()).default([]),
    thumbnail: z.string().default(''),
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    weight: z.number().optional(),
    isFeatured: z.boolean().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    tags: z.array(z.string()).optional(),
    price: z.number().nonnegative().optional(),
    regularPrice: z.number().nonnegative().optional(),
    costPriceRMB: z.number().optional(),
    costPriceBDT: z.number().optional(),
    grossMarginPercent: z.number().optional(),
    stock: z.number().nonnegative().optional(),
    status: z.enum(ProductStatusList).optional(),
    incomingDate: z.string().datetime().optional().nullable(),
    wholesaleTiers: z
      .array(
        z.object({
          minQty: z.number(),
          unitPrice: z.number(),
        }),
      )
      .optional(),
    variants: z
      .array(
        z.object({
          name: z.string(),
          sku: z.string(),
          price: z.number(),
          stock: z.number(),
          attributes: z.record(z.string()).optional(),
        }),
      )
      .optional(),
    specs: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    images: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    weight: z.number().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
