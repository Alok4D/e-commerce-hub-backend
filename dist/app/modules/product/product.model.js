"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
const wholesaleTierSchema = new mongoose_1.Schema({
    minQty: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
}, { _id: false });
const variantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    attributes: { type: Map, of: String, default: {} },
}, { _id: false });
const specSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });
const productSchema = new mongoose_1.Schema({
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
        enum: product_constant_1.ProductStatusList,
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
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
