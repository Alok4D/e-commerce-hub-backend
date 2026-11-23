import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CouponControllers } from './coupon.controller';
import { CouponValidation } from './coupon.validation';

const router = express.Router();

router.post(
  '/apply',
  validateRequest(CouponValidation.applyCouponValidationSchema),
  CouponControllers.applyCoupon,
);

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER),
  validateRequest(CouponValidation.createCouponValidationSchema),
  CouponControllers.createCoupon,
);

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER, USER_ROLE.SALES_STAFF),
  CouponControllers.getAllCoupons,
);

router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  CouponControllers.deleteCoupon,
);

export const CouponRoutes = router;
