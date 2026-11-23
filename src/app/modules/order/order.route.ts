import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

// Allow public/guest checkout and authenticated checkout
router.post(
  '/',
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get(
  '/my-orders',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  OrderControllers.getMyOrders,
);

router.get(
  '/',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  OrderControllers.getAllOrders,
);

router.get('/:id', OrderControllers.getSingleOrder);

router.patch(
  '/:id/status',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  validateRequest(OrderValidation.updateOrderStatusValidationSchema),
  OrderControllers.updateOrderStatus,
);

router.patch(
  '/:id/cancel',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  validateRequest(OrderValidation.cancelOrderValidationSchema),
  OrderControllers.cancelOrder,
);

router.patch(
  '/:id/return',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
  ),
  validateRequest(OrderValidation.returnOrderValidationSchema),
  OrderControllers.returnOrder,
);

export const OrderRoutes = router;
