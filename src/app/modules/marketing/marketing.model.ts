import { Schema, model } from 'mongoose';
import { TCampaign, TSocialAccount, TSocialPost } from './marketing.interface';

const socialAccountSchema = new Schema<TSocialAccount>(
  {
    id: { type: String, required: true, unique: true },
    platform: { type: String, enum: ['Facebook', 'Instagram', 'TikTok'], required: true },
    accountName: { type: String, required: true },
    handle: { type: String, required: true },
    status: { type: String, enum: ['Connected', 'Expired', 'Disconnected'], default: 'Connected' },
    followers: { type: String, default: '0 followers' },
    lastSync: { type: String, default: 'Just now' },
    avatar: { type: String, default: '' },
  },
  { timestamps: true },
);

const socialPostSchema = new Schema<TSocialPost>(
  {
    product: { type: String, required: true },
    platform: { type: String, required: true },
    status: { type: String, enum: ['PUBLISHED', 'QUEUED', 'FAILED'], default: 'PUBLISHED' },
    publishedAt: { type: String, required: true },
    reach: { type: String, default: '0 people' },
    clicks: { type: Number, default: 0 },
    postUrl: { type: String },
  },
  { timestamps: true },
);

const campaignSchema = new Schema<TCampaign>(
  {
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
  },
  { timestamps: true },
);

export const SocialAccount = model<TSocialAccount>('SocialAccount', socialAccountSchema);
export const SocialPost = model<TSocialPost>('SocialPost', socialPostSchema);
export const Campaign = model<TCampaign>('Campaign', campaignSchema);
