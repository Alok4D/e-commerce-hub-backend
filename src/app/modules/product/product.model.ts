import { Schema, model } from 'mongoose';
import {
  TProduct,
  TProductSpec,
  TProductVariant,
  TWholesaleTier,
} from './product.interface';
import { ProductStatusList } from './product.constant';

const wholesaleTierSchema = new Schema<TWholesaleTier>(
  {
    minQty: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

const variantSchema = new Schema<TProductVariant>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    attributes: { type: Map, of: String, default: {} },
  },
  { _id: false },
);

const specSchema = new Schema<TProductSpec>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subCategory: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    costPriceRMB: {
      type: Number,
      default: 0,
    },
    costPriceBDT: {
      type: Number,
      default: 0,
    },
    grossMarginPercent: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ProductStatusList,
      default: 'ACTIVE',
      index: true,
    },
    incomingDate: {
      type: Date,
    },
    wholesaleTiers: {
      type: [wholesaleTierSchema],
      default: [],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    specs: {
      type: [specSchema],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    weight: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

export const Product = model<TProduct>('Product', productSchema);
