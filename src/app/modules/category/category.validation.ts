import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    slug: z.string({ required_error: 'Slug is required' }),
    department: z.string({ required_error: 'Department is required' }),
    subCategories: z.array(z.string()).default([]),
    icon: z.string().optional(),
    image: z.string().optional(),
    marketingTags: z.array(z.string()).default([]),
    specTemplates: z
      .array(
        z.object({
          fieldName: z.string(),
          inputType: z.enum(['text', 'number', 'select', 'boolean']).default('text'),
          required: z.boolean().default(false),
          options: z.array(z.string()).optional(),
        }),
      )
      .default([]),
    status: z.enum(['ACTIVE', 'ARCHIVED']).default('ACTIVE'),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    department: z.string().optional(),
    subCategories: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    marketingTags: z.array(z.string()).optional(),
    specTemplates: z
      .array(
        z.object({
          fieldName: z.string(),
          inputType: z.enum(['text', 'number', 'select', 'boolean']).default('text'),
          required: z.boolean().default(false),
          options: z.array(z.string()).optional(),
        }),
      )
      .optional(),
    status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
