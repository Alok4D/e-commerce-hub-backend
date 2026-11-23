import express from 'express';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';
import { MarketingControllers } from './marketing.controller';

const router = express.Router();

router.get(
  '/social-accounts',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  MarketingControllers.getSocialAccounts,
);

router.get(
  '/social-posts',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  MarketingControllers.getSocialPosts,
);

router.post(
  '/social-posts',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  MarketingControllers.createSocialPost,
);

router.get(
  '/campaigns',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  MarketingControllers.getCampaigns,
);

router.post(
  '/campaigns',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  MarketingControllers.createCampaign,
);

export const MarketingRoutes = router;
