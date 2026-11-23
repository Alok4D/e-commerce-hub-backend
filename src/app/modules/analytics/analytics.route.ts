import express from 'express';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AnalyticsControllers } from './analytics.controller';

const router = express.Router();

router.get(
  '/dashboard-overview',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  AnalyticsControllers.getDashboardOverview,
);

export const AnalyticsRoutes = router;
