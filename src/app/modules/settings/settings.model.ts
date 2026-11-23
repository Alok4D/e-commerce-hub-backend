import { Schema, model } from 'mongoose';
import { TAuditLog, TSettings } from './settings.interface';

const auditLogSchema = new Schema<TAuditLog>(
  {
    id: { type: String, required: true },
    user: { type: String, required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false },
);

const settingsSchema = new Schema<TSettings>(
  {
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
  },
  {
    timestamps: true,
  },
);

export const Settings = model<TSettings>('Settings', settingsSchema);
