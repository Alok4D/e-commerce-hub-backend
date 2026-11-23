"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const coupon_controller_1 = require("./coupon.controller");
const coupon_validation_1 = require("./coupon.validation");
const router = express_1.default.Router();
router.post('/apply', (0, validateRequest_1.default)(coupon_validation_1.CouponValidation.applyCouponValidationSchema), coupon_controller_1.CouponControllers.applyCoupon);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER), (0, validateRequest_1.default)(coupon_validation_1.CouponValidation.createCouponValidationSchema), coupon_controller_1.CouponControllers.createCoupon);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), coupon_controller_1.CouponControllers.getAllCoupons);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN), coupon_controller_1.CouponControllers.deleteCoupon);
exports.CouponRoutes = router;
