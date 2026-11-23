"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const createUserIntoDB = async (payload) => {
    const existingUserByPhone = await user_model_1.User.isUserExistsByPhone(payload.phone);
    if (existingUserByPhone) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User with this phone number already exists!');
    }
    if (payload.email) {
        const existingUserByEmail = await user_model_1.User.isUserExistsByEmail(payload.email);
        if (existingUserByEmail) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User with this email already exists!');
        }
    }
    const customId = `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    payload.id = customId;
    const result = await user_model_1.User.create(payload);
    return result;
};
const getAllUsersFromDB = async (query) => {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find({ isDeleted: false }), query)
        .search(user_constant_1.UserSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await userQuery.modelQuery;
    const count = await user_model_1.User.countDocuments({ isDeleted: false });
    return {
        meta: {
            total: count,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        },
        data: result,
    };
};
const getSingleUserFromDB = async (id) => {
    const result = await user_model_1.User.findOne({ id, isDeleted: false });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
};
const getMyProfileFromDB = async (userId) => {
    const result = await user_model_1.User.findOne({ id: userId, isDeleted: false });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
};
const updateMyProfileIntoDB = async (userId, payload) => {
    const result = await user_model_1.User.findOneAndUpdate({ id: userId, isDeleted: false }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
};
const updateUserIntoDB = async (id, payload) => {
    const result = await user_model_1.User.findOneAndUpdate({ id, isDeleted: false }, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
};
const deleteUserFromDB = async (id) => {
    const result = await user_model_1.User.findOneAndUpdate({ id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
};
const addSavedAddressIntoDB = async (userId, addressData) => {
    const user = await user_model_1.User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const newAddress = {
        ...addressData,
        id: `ADDR-${Date.now()}`,
    };
    if (newAddress.isDefault) {
        user.savedAddresses.forEach((addr) => {
            addr.isDefault = false;
        });
    }
    user.savedAddresses.push(newAddress);
    await user.save();
    return user.savedAddresses;
};
const deleteSavedAddressFromDB = async (userId, addressId) => {
    const user = await user_model_1.User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    user.savedAddresses = user.savedAddresses.filter((a) => a.id !== addressId);
    await user.save();
    return user.savedAddresses;
};
const updatePreferencesIntoDB = async (userId, preferences) => {
    const user = await user_model_1.User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    user.preferences = {
        ...user.preferences,
        ...preferences,
    };
    await user.save();
    return user.preferences;
};
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    getMyProfileFromDB,
    updateMyProfileIntoDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addSavedAddressIntoDB,
    deleteSavedAddressFromDB,
    updatePreferencesIntoDB,
};
