"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const user_constant_1 = require("../user/user.constant");
const marketing_controller_1 = require("./marketing.controller");
const router = express_1.default.Router();
router.get('/social-accounts', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), marketing_controller_1.MarketingControllers.getSocialAccounts);
router.get('/social-posts', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), marketing_controller_1.MarketingControllers.getSocialPosts);
router.post('/social-posts', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), marketing_controller_1.MarketingControllers.createSocialPost);
router.get('/campaigns', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), marketing_controller_1.MarketingControllers.getCampaigns);
router.post('/campaigns', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), marketing_controller_1.MarketingControllers.createCampaign);
exports.MarketingRoutes = router;
