import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CustomerControllers } from './customer.controller';
import { CustomerValidation } from './customer.validation';

const router = express.Router();

router.get(
  '/dashboard/follow-ups',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CATALOG_MANAGER,
  ),
  CustomerControllers.getPendingFollowUps,
);

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.SALES_STAFF),
  validateRequest(CustomerValidation.createCustomerValidationSchema),
  CustomerControllers.createCustomer,
);

router.get(
  '/',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CATALOG_MANAGER,
  ),
  CustomerControllers.getAllCustomers,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CATALOG_MANAGER,
  ),
  CustomerControllers.getSingleCustomer,
);

router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.SALES_STAFF),
  validateRequest(CustomerValidation.updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);

router.post(
  '/:id/notes',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.SALES_STAFF),
  validateRequest(CustomerValidation.addNoteValidationSchema),
  CustomerControllers.addNote,
);

router.post(
  '/:id/follow-ups',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.SALES_STAFF),
  validateRequest(CustomerValidation.addFollowUpValidationSchema),
  CustomerControllers.addFollowUp,
);

router.patch(
  '/:id/follow-ups/:followUpId',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.SALES_STAFF),
  CustomerControllers.toggleFollowUp,
);

export const CustomerRoutes = router;
