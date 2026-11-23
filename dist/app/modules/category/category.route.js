"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategoryValidationSchema), category_controller_1.CategoryControllers.createCategory);
router.get('/', category_controller_1.CategoryControllers.getAllCategories);
router.get('/:id', category_controller_1.CategoryControllers.getSingleCategory);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.updateCategoryValidationSchema), category_controller_1.CategoryControllers.updateCategory);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
