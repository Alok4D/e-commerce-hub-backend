import { Schema, model } from 'mongoose';
import {
  TOrder,
  TOrderCourier,
  TOrderCustomer,
  TOrderHistory,
  TOrderItem,
} from './order.interface';
import {
  OrderStatusList,
  PaymentMethodList,
  PaymentStatusList,
} from './order.constant';

const orderItemSchema = new Schema<TOrderItem>(
  {
    productId: { type: Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
    variant: { type: String, default: '' },
    sku: { type: String, default: '' },
  },
  { _id: false },
);

const customerSchema = new Schema<TOrderCustomer>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String, default: '' },
    address: { type: String, required: true },
    city: { type: String, default: 'Dhaka' },
  },
  { _id: false },
);

const courierSchema = new Schema<TOrderCourier>(
  {
    name: {
      type: String,
      enum: ['Pathao', 'Steadfast', 'RedX', 'Paperfly', 'Self'],
      default: 'Pathao',
    },
    trackingCode: { type: String, default: '' },
    consignmentId: { type: String, default: '' },
    status: { type: String, default: '' },
  },
  { _id: false },
);

const orderHistorySchema = new Schema<TOrderHistory>(
  {
    status: { type: String, enum: OrderStatusList, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: String, default: 'System' },
    note: { type: String, default: '' },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.Mixed,
      ref: 'User',
    },
    customer: {
      type: customerSchema,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 60,
    },
    discount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethodList,
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatusList,
      default: 'PENDING',
    },
    orderStatus: {
      type: String,
      enum: OrderStatusList,
      default: 'PENDING',
      index: true,
    },
    courier: {
      type: courierSchema,
    },
    cancellationReason: {
      type: String,
    },
    returnReason: {
      type: String,
    },
    notes: {
      type: String,
    },
    history: {
      type: [orderHistorySchema],
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

export const Order = model<TOrder>('Order', orderSchema);
