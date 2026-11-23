"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = require("./order.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const order_constant_1 = require("./order.constant");
const customer_model_1 = require("../customer/customer.model");
const createOrderIntoDB = async (payload, userId) => {
    // Generate human-friendly orderNumber
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${Date.now().toString().slice(-4)}${randomSuffix}`;
    const initialHistory = [
        {
            status: 'PENDING',
            changedAt: new Date(),
            changedBy: payload.customer?.name || 'Customer',
            note: 'Order successfully placed via Storefront',
        },
    ];
    const orderData = {
        ...payload,
        orderNumber,
        user: userId || undefined,
        orderStatus: 'PENDING',
        paymentStatus: payload.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        history: initialHistory,
    };
    const result = await order_model_1.Order.create(orderData);
    // Sync to Customer CRM if phone provided
    if (payload.customer?.phone) {
        try {
            const customer = await customer_model_1.Customer.findOne({ phone: payload.customer.phone });
            if (customer) {
                customer.totalOrders += 1;
                customer.lifetimeSpend += payload.total || 0;
                customer.lastOrderDate = new Date();
                customer.timeline.push({
                    date: new Date(),
                    type: 'ORDER',
                    title: `New Order Placed: #${orderNumber}`,
                    details: `Order total ৳${payload.total} with ${payload.items?.length || 0} items. Payment: ${payload.paymentMethod}`,
                });
                await customer.save();
            }
            else {
                await customer_model_1.Customer.create({
                    phone: payload.customer.phone,
                    name: payload.customer.name,
                    email: payload.customer.email,
                    address: payload.customer.address,
                    city: payload.customer.city,
                    totalOrders: 1,
                    lifetimeSpend: payload.total || 0,
                    lastOrderDate: new Date(),
                    tags: ['New Customer'],
                    notes: [],
                    timeline: [
                        {
                            date: new Date(),
                            type: 'ORDER',
                            title: `First Order: #${orderNumber}`,
                            details: `Initial order ৳${payload.total} placed via storefront.`,
                        },
                    ],
                    followUps: [],
                });
            }
        }
        catch {
            // CRM sync failure shouldn't abort order creation
        }
    }
    return result;
};
const getAllOrdersFromDB = async (query) => {
    const queryObj = { ...query };
    const filterConditions = { isDeleted: false };
    if (queryObj.orderStatus && queryObj.orderStatus !== 'all') {
        filterConditions.orderStatus = queryObj.orderStatus;
    }
    if (queryObj.paymentStatus && queryObj.paymentStatus !== 'all') {
        filterConditions.paymentStatus = queryObj.paymentStatus;
    }
    if (queryObj.phone) {
        filterConditions['customer.phone'] = queryObj.phone;
    }
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find(filterConditions), query)
        .search(order_constant_1.OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await orderQuery.modelQuery;
    const count = await order_model_1.Order.countDocuments(filterConditions);
    return {
        meta: {
            total: count,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        },
        data: result,
    };
};
const getMyOrdersFromDB = async (userId, phone) => {
    const conditions = [{ user: userId }];
    if (phone) {
        conditions.push({ 'customer.phone': phone });
    }
    const result = await order_model_1.Order.find({
        $or: conditions,
        isDeleted: false,
    }).sort('-createdAt');
    return result;
};
const getSingleOrderFromDB = async (idOrOrderNumber) => {
    let result = null;
    if (idOrOrderNumber.match(/^[0-9a-fA-F]{24}$/)) {
        result = await order_model_1.Order.findOne({ _id: idOrOrderNumber, isDeleted: false });
    }
    if (!result) {
        result = await order_model_1.Order.findOne({ orderNumber: idOrOrderNumber, isDeleted: false });
    }
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    return result;
};
const updateOrderStatusIntoDB = async (id, payload, staffName = 'Staff') => {
    const order = await order_model_1.Order.findById(id);
    if (!order || order.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    if (payload.orderStatus) {
        order.orderStatus = payload.orderStatus;
        order.history.push({
            status: payload.orderStatus,
            changedAt: new Date(),
            changedBy: staffName,
            note: payload.note || `Status updated to ${payload.orderStatus}`,
        });
    }
    if (payload.paymentStatus) {
        order.paymentStatus = payload.paymentStatus;
    }
    if (payload.courier) {
        order.courier = {
            ...order.courier,
            ...payload.courier,
        };
    }
    await order.save();
    return order;
};
const cancelOrderIntoDB = async (id, reason, staffOrUser = 'Staff') => {
    const order = await order_model_1.Order.findById(id);
    if (!order || order.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    if (order.orderStatus === 'DELIVERED') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Delivered order cannot be cancelled! Use Return instead.');
    }
    order.orderStatus = 'CANCELLED';
    order.cancellationReason = reason;
    order.history.push({
        status: 'CANCELLED',
        changedAt: new Date(),
        changedBy: staffOrUser,
        note: `Order cancelled. Reason: ${reason}`,
    });
    await order.save();
    return order;
};
const returnOrderIntoDB = async (id, reason, staffName = 'Staff') => {
    const order = await order_model_1.Order.findById(id);
    if (!order || order.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    order.orderStatus = 'RETURNED';
    order.returnReason = reason;
    order.history.push({
        status: 'RETURNED',
        changedAt: new Date(),
        changedBy: staffName,
        note: `Order marked as returned. Reason: ${reason}`,
    });
    await order.save();
    return order;
};
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getMyOrdersFromDB,
    getSingleOrderFromDB,
    updateOrderStatusIntoDB,
    cancelOrderIntoDB,
    returnOrderIntoDB,
};
