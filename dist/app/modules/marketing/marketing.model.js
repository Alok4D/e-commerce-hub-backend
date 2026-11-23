"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = exports.SocialPost = exports.SocialAccount = void 0;
const mongoose_1 = require("mongoose");
const socialAccountSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    platform: { type: String, enum: ['Facebook', 'Instagram', 'TikTok'], required: true },
    accountName: { type: String, required: true },
    handle: { type: String, required: true },
    status: { type: String, enum: ['Connected', 'Expired', 'Disconnected'], default: 'Connected' },
    followers: { type: String, default: '0 followers' },
    lastSync: { type: String, default: 'Just now' },
    avatar: { type: String, default: '' },
}, { timestamps: true });
const socialPostSchema = new mongoose_1.Schema({
    product: { type: String, required: true },
    platform: { type: String, required: true },
    status: { type: String, enum: ['PUBLISHED', 'QUEUED', 'FAILED'], default: 'PUBLISHED' },
    publishedAt: { type: String, required: true },
    reach: { type: String, default: '0 people' },
    clicks: { type: Number, default: 0 },
    postUrl: { type: String },
}, { timestamps: true });
const campaignSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    channel: { type: String, enum: ['WhatsApp', 'SMS', 'Email'], required: true },
    audience: { type: String, required: true },
    eligibleCount: { type: Number, default: 0 },
    excludedCount: { type: Number, default: 0 },
    messageBody: { type: String, required: true },
    status: { type: String, enum: ['DRAFT', 'SCHEDULED', 'SENT'], default: 'SENT' },
    scheduledFor: { type: Date },
    sentAt: { type: Date, default: Date.now },
    deliveredRate: { type: String, default: '100%' },
}, { timestamps: true });
exports.SocialAccount = (0, mongoose_1.model)('SocialAccount', socialAccountSchema);
exports.SocialPost = (0, mongoose_1.model)('SocialPost', socialPostSchema);
exports.Campaign = (0, mongoose_1.model)('Campaign', campaignSchema);
