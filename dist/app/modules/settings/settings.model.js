"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = require("mongoose");
const auditLogSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: String, required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });
const settingsSchema = new mongoose_1.Schema({
    rmbExchangeRate: {
        type: Number,
        required: true,
        default: 16.85,
    },
    shippingBufferRmb: {
        type: Number,
        required: true,
        default: 2.5,
    },
    insideDhakaFee: {
        type: Number,
        required: true,
        default: 60,
    },
    outsideDhakaFee: {
        type: Number,
        required: true,
        default: 120,
    },
    freeShippingThreshold: {
        type: Number,
        required: true,
        default: 2000,
    },
    codEnabled: {
        type: Boolean,
        default: true,
    },
    bkashMerchantNumber: {
        type: String,
        default: '01800000000',
    },
    supportPhone: {
        type: String,
        default: '01700-000000',
    },
    supportEmail: {
        type: String,
        default: 'support@nexora.com.bd',
    },
    auditLogs: {
        type: [auditLogSchema],
        default: [],
    },
}, {
    timestamps: true,
});
exports.Settings = (0, mongoose_1.model)('Settings', settingsSchema);
