import { Schema, model } from 'mongoose';
import {
  TCustomer,
  TCustomerFollowUp,
  TCustomerNote,
  TCustomerTimeline,
} from './customer.interface';

const customerNoteSchema = new Schema<TCustomerNote>(
  {
    text: { type: String, required: true },
    staffName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const customerTimelineSchema = new Schema<TCustomerTimeline>(
  {
    date: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ['ORDER', 'CALL', 'NOTE', 'WHATSAPP'],
      required: true,
    },
    title: { type: String, required: true },
    details: { type: String, required: true },
    staffName: { type: String },
  },
  { _id: false },
);

const customerFollowUpSchema = new Schema<TCustomerFollowUp>(
  {
    id: { type: String, required: true },
    dueDate: { type: Date, required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    assignee: { type: String, default: 'Sales Team' },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },
  },
  { _id: false },
);

const customerSchema = new Schema<TCustomer>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Dhaka',
    },
    tags: {
      type: [String],
      default: ['New Customer'],
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    lifetimeSpend: {
      type: Number,
      default: 0,
    },
    lastOrderDate: {
      type: Date,
    },
    notes: {
      type: [customerNoteSchema],
      default: [],
    },
    timeline: {
      type: [customerTimelineSchema],
      default: [],
    },
    followUps: {
      type: [customerFollowUpSchema],
      default: [],
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

export const Customer = model<TCustomer>('Customer', customerSchema);
