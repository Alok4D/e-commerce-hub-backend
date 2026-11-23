import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SettingsControllers } from './settings.controller';
import { SettingsValidation } from './settings.validation';

const router = express.Router();

router.get('/', SettingsControllers.getSettings);

router.patch(
  '/',
  auth(USER_ROLE.SUPER_ADMIN),
  validateRequest(SettingsValidation.updateSettingsValidationSchema),
  SettingsControllers.updateSettings,
);

router.post(
  '/audit-logs',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  validateRequest(SettingsValidation.createAuditLogValidationSchema),
  SettingsControllers.addAuditLog,
);

export const SettingsRoutes = router;
