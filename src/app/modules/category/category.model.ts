import { Schema, model } from 'mongoose';
import { TCategory, TSpecTemplate } from './category.interface';

const specTemplateSchema = new Schema<TSpecTemplate>(
  {
    fieldName: { type: String, required: true },
    inputType: {
      type: String,
      enum: ['text', 'number', 'select', 'boolean'],
      default: 'text',
    },
    required: { type: Boolean, default: false },
    options: { type: [String], default: [] },
  },
  { _id: false },
);

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    subCategories: {
      type: [String],
      default: [],
    },
    icon: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    marketingTags: {
      type: [String],
      default: [],
    },
    specTemplates: {
      type: [specTemplateSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ARCHIVED'],
      default: 'ACTIVE',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = model<TCategory>('Category', categorySchema);
