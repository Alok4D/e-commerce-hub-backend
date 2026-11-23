"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const orderItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
    variant: { type: String, default: '' },
    sku: { type: String, default: '' },
}, { _id: false });
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String, default: '' },
    address: { type: String, required: true },
    city: { type: String, default: 'Dhaka' },
}, { _id: false });
const courierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['Pathao', 'Steadfast', 'RedX', 'Paperfly', 'Self'],
        default: 'Pathao',
    },
    trackingCode: { type: String, default: '' },
    consignmentId: { type: String, default: '' },
    status: { type: String, default: '' },
}, { _id: false });
const orderHistorySchema = new mongoose_1.Schema({
    status: { type: String, enum: order_constant_1.OrderStatusList, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: String, default: 'System' },
    note: { type: String, default: '' },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    user: {
        type: mongoose_1.Schema.Types.Mixed,
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
        enum: order_constant_1.PaymentMethodList,
        default: 'COD',
    },
    paymentStatus: {
        type: String,
        enum: order_constant_1.PaymentStatusList,
        default: 'PENDING',
    },
    orderStatus: {
        type: String,
        enum: order_constant_1.OrderStatusList,
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
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
