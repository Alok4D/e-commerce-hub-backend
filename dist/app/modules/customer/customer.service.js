"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const customer_model_1 = require("./customer.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const customer_constant_1 = require("./customer.constant");
const order_model_1 = require("../order/order.model");
const createCustomerIntoDB = async (payload) => {
    const isExist = await customer_model_1.Customer.findOne({ phone: payload.phone });
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Customer with this phone already exists!');
    }
    const result = await customer_model_1.Customer.create(payload);
    return result;
};
const getAllCustomersFromDB = async (query) => {
    const queryObj = { ...query };
    const filterConditions = { isDeleted: false };
    if (queryObj.tag && queryObj.tag !== 'all') {
        filterConditions.tags = { $in: [queryObj.tag] };
    }
    const customerQuery = new QueryBuilder_1.default(customer_model_1.Customer.find(filterConditions), query)
        .search(customer_constant_1.CustomerSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await customerQuery.modelQuery;
    const count = await customer_model_1.Customer.countDocuments(filterConditions);
    return {
        meta: {
            total: count,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        },
        data: result,
    };
};
const getSingleCustomerFromDB = async (idOrPhone) => {
    let customer = null;
    if (idOrPhone.match(/^[0-9a-fA-F]{24}$/)) {
        customer = await customer_model_1.Customer.findOne({ _id: idOrPhone, isDeleted: false });
    }
    if (!customer) {
        customer = await customer_model_1.Customer.findOne({ phone: idOrPhone, isDeleted: false });
    }
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found!');
    }
    // Fetch recent customer orders for the 360 profile
    const recentOrders = await order_model_1.Order.find({
        'customer.phone': customer.phone,
        isDeleted: false,
    })
        .sort('-createdAt')
        .limit(10);
    return {
        customer,
        recentOrders,
    };
};
const updateCustomerIntoDB = async (id, payload) => {
    const result = await customer_model_1.Customer.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found!');
    }
    return result;
};
const addCustomerNoteIntoDB = async (id, text, staffName) => {
    const customer = await customer_model_1.Customer.findById(id);
    if (!customer || customer.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found!');
    }
    const newNote = {
        text,
        staffName,
        createdAt: new Date(),
    };
    customer.notes.unshift(newNote);
    customer.timeline.unshift({
        date: new Date(),
        type: 'NOTE',
        title: `Note logged by ${staffName}`,
        details: text,
        staffName,
    });
    await customer.save();
    return customer;
};
const addFollowUpIntoDB = async (id, payload) => {
    const customer = await customer_model_1.Customer.findById(id);
    if (!customer || customer.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found!');
    }
    const followUp = {
        id: `FU-${Date.now()}`,
        dueDate: new Date(payload.dueDate),
        task: payload.task,
        completed: false,
        assignee: payload.assignee,
        priority: payload.priority,
    };
    customer.followUps.push(followUp);
    customer.timeline.unshift({
        date: new Date(),
        type: 'CALL',
        title: `Follow-up Scheduled: ${payload.task}`,
        details: `Assigned to ${payload.assignee}, Due: ${new Date(payload.dueDate).toLocaleDateString()}`,
        staffName: payload.assignee,
    });
    await customer.save();
    return customer;
};
const toggleFollowUpStatusIntoDB = async (customerId, followUpId) => {
    const customer = await customer_model_1.Customer.findById(customerId);
    if (!customer || customer.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found!');
    }
    const task = customer.followUps.find((fu) => fu.id === followUpId);
    if (!task) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Follow-up task not found!');
    }
    task.completed = !task.completed;
    await customer.save();
    return customer;
};
const getAllPendingFollowUpsFromDB = async () => {
    const customers = await customer_model_1.Customer.find({
        isDeleted: false,
        'followUps.completed': false,
    }).select('name phone followUps');
    const tasks = [];
    customers.forEach((cust) => {
        cust.followUps.forEach((fu) => {
            if (!fu.completed) {
                tasks.push({
                    customerId: cust._id.toString(),
                    customerName: cust.name,
                    customerPhone: cust.phone,
                    id: fu.id,
                    dueDate: fu.dueDate,
                    task: fu.task,
                    completed: fu.completed,
                    assignee: fu.assignee,
                    priority: fu.priority,
                });
            }
        });
    });
    tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    return tasks;
};
exports.CustomerServices = {
    createCustomerIntoDB,
    getAllCustomersFromDB,
    getSingleCustomerFromDB,
    updateCustomerIntoDB,
    addCustomerNoteIntoDB,
    addFollowUpIntoDB,
    toggleFollowUpStatusIntoDB,
    getAllPendingFollowUpsFromDB,
};
