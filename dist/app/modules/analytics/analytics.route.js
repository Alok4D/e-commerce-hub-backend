"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const user_constant_1 = require("../user/user.constant");
const analytics_controller_1 = require("./analytics.controller");
const router = express_1.default.Router();
router.get('/dashboard-overview', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), analytics_controller_1.AnalyticsControllers.getDashboardOverview);
exports.AnalyticsRoutes = router;
