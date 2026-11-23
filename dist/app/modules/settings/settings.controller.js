"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
const settings_service_1 = require("./settings.service");
const getSettings = (0, catchAsync_1.default)(async (req, res) => {
    const result = await settings_service_1.SettingsServices.getSettingsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Settings retrieved successfully',
        data: result,
    });
});
const updateSettings = (0, catchAsync_1.default)(async (req, res) => {
    const staffName = req.user?.userId || 'Admin';
    const role = req.user?.role || 'SUPER_ADMIN';
    const result = await settings_service_1.SettingsServices.updateSettingsIntoDB(req.body, staffName, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Settings updated successfully',
        data: result,
    });
});
const addAuditLog = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user?.userId || 'Staff';
    const role = req.user?.role || 'STAFF';
    const result = await settings_service_1.SettingsServices.addAuditLogIntoDB(req.body, user, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Audit log created successfully',
        data: result,
    });
});
exports.SettingsControllers = {
    getSettings,
    updateSettings,
    addAuditLog,
};
