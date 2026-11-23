"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const marketing_service_1 = require("./marketing.service");
const getSocialAccounts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await marketing_service_1.MarketingServices.getSocialAccountsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Social accounts retrieved successfully',
        data: result,
    });
});
const getSocialPosts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await marketing_service_1.MarketingServices.getSocialPostsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Social posts retrieved successfully',
        data: result,
    });
});
const createSocialPost = (0, catchAsync_1.default)(async (req, res) => {
    const result = await marketing_service_1.MarketingServices.createSocialPostIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Social post scheduled/published successfully',
        data: result,
    });
});
const getCampaigns = (0, catchAsync_1.default)(async (req, res) => {
    const result = await marketing_service_1.MarketingServices.getCampaignsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Campaigns retrieved successfully',
        data: result,
    });
});
const createCampaign = (0, catchAsync_1.default)(async (req, res) => {
    const result = await marketing_service_1.MarketingServices.createCampaignIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Campaign created successfully',
        data: result,
    });
});
exports.MarketingControllers = {
    getSocialAccounts,
    getSocialPosts,
    createSocialPost,
    getCampaigns,
    createCampaign,
};
