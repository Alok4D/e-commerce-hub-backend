"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
// Allow public/guest checkout and authenticated checkout
router.post('/', (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderValidationSchema), order_controller_1.OrderControllers.createOrder);
router.get('/my-orders', (0, auth_1.default)(user_constant_1.USER_ROLE.CUSTOMER, user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), order_controller_1.OrderControllers.getMyOrders);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), order_controller_1.OrderControllers.getAllOrders);
router.get('/:id', order_controller_1.OrderControllers.getSingleOrder);
router.patch('/:id/status', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), (0, validateRequest_1.default)(order_validation_1.OrderValidation.updateOrderStatusValidationSchema), order_controller_1.OrderControllers.updateOrderStatus);
router.patch('/:id/cancel', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF, user_constant_1.USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.cancelOrderValidationSchema), order_controller_1.OrderControllers.cancelOrder);
router.patch('/:id/return', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), (0, validateRequest_1.default)(order_validation_1.OrderValidation.returnOrderValidationSchema), order_controller_1.OrderControllers.returnOrder);
exports.OrderRoutes = router;
