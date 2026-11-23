"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlwares/auth"));
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const settings_controller_1 = require("./settings.controller");
const settings_validation_1 = require("./settings.validation");
const router = express_1.default.Router();
router.get('/', settings_controller_1.SettingsControllers.getSettings);
router.patch('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.updateSettingsValidationSchema), settings_controller_1.SettingsControllers.updateSettings);
router.post('/audit-logs', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.CATALOG_MANAGER, user_constant_1.USER_ROLE.SALES_STAFF), (0, validateRequest_1.default)(settings_validation_1.SettingsValidation.createAuditLogValidationSchema), settings_controller_1.SettingsControllers.addAuditLog);
exports.SettingsRoutes = router;
