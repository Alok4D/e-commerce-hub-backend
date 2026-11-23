"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const createCategoryIntoDB = async (payload) => {
    const existingCategory = await category_model_1.Category.findOne({ slug: payload.slug });
    if (existingCategory) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Category with this slug already exists!');
    }
    const result = await category_model_1.Category.create(payload);
    return result;
};
const getAllCategoriesFromDB = async (query) => {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find({ isDeleted: false }), query)
        .search(category_constant_1.CategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await categoryQuery.modelQuery;
    const count = await category_model_1.Category.countDocuments({ isDeleted: false });
    return {
        meta: {
            total: count,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        },
        data: result,
    };
};
const getSingleCategoryFromDB = async (id) => {
    const result = await category_model_1.Category.findById(id);
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    return result;
};
const updateCategoryIntoDB = async (id, payload) => {
    const result = await category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    return result;
};
const deleteCategoryFromDB = async (id) => {
    const result = await category_model_1.Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    return result;
};
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB,
};
