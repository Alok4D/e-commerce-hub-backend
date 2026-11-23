"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodList = exports.PaymentStatusList = exports.OrderStatusList = exports.OrderSearchableFields = void 0;
exports.OrderSearchableFields = [
    'orderNumber',
    'customer.name',
    'customer.phone',
    'customer.address',
    'courier.trackingCode',
    'courier.consignmentId',
];
exports.OrderStatusList = [
    'PENDING',
    'CONFIRMED',
    'PACKED',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
];
exports.PaymentStatusList = ['PENDING', 'PAID', 'FAILED'];
exports.PaymentMethodList = ['COD', 'BKASH', 'CARD'];
