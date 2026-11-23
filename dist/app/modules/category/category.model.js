"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const specTemplateSchema = new mongoose_1.Schema({
    fieldName: { type: String, required: true },
    inputType: {
        type: String,
        enum: ['text', 'number', 'select', 'boolean'],
        default: 'text',
    },
    required: { type: Boolean, default: false },
    options: { type: [String], default: [] },
}, { _id: false });
const categorySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
