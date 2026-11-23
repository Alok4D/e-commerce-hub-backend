"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const createProductIntoDB = async (payload) => {
    const isSkuExist = await product_model_1.Product.findOne({ sku: payload.sku });
    if (isSkuExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product with this SKU already exists!');
    }
    const isSlugExist = await product_model_1.Product.findOne({ slug: payload.slug });
    if (isSlugExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product with this slug already exists!');
    }
    const result = await product_model_1.Product.create(payload);
    return result;
};
const getAllProductsFromDB = async (query) => {
    // Support custom filter queries like minPrice, maxPrice, category, tag
    const queryObj = { ...query };
    const filterConditions = { isDeleted: false };
    if (queryObj.category && queryObj.category !== 'all') {
        filterConditions.category = new RegExp(String(queryObj.category), 'i');
    }
    if (queryObj.tag) {
        filterConditions.tags = { $in: [queryObj.tag] };
    }
    if (queryObj.status && queryObj.status !== 'all') {
        filterConditions.status = queryObj.status;
    }
    if (queryObj.minPrice || queryObj.maxPrice) {
        const priceCondition = {};
        if (queryObj.minPrice)
            priceCondition.$gte = Number(queryObj.minPrice);
        if (queryObj.maxPrice)
            priceCondition.$lte = Number(queryObj.maxPrice);
        filterConditions.price = priceCondition;
    }
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(filterConditions), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await productQuery.modelQuery;
    const count = await product_model_1.Product.countDocuments(filterConditions);
    return {
        meta: {
            total: count,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        },
        data: result,
    };
};
const getSingleProductFromDB = async (idOrSlug) => {
    let result = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        result = await product_model_1.Product.findOne({ _id: idOrSlug, isDeleted: false });
    }
    if (!result) {
        result = await product_model_1.Product.findOne({ slug: idOrSlug, isDeleted: false });
    }
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return result;
};
const updateProductIntoDB = async (id, payload) => {
    const result = await product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return result;
};
const deleteProductFromDB = async (id) => {
    const result = await product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return result;
};
const archiveProductIntoDB = async (id) => {
    const result = await product_model_1.Product.findByIdAndUpdate(id, { status: 'ARCHIVED' }, { new: true });
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return result;
};
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    archiveProductIntoDB,
};
