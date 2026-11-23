import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/me',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  UserControllers.getMyProfile,
);

router.patch(
  '/me',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserControllers.updateMyProfile,
);

router.post(
  '/me/addresses',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  UserControllers.addSavedAddress,
);

router.delete(
  '/me/addresses/:addressId',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  UserControllers.deleteSavedAddress,
);

router.patch(
  '/me/preferences',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.CATALOG_MANAGER,
    USER_ROLE.SALES_STAFF,
    USER_ROLE.CUSTOMER,
  ),
  UserControllers.updatePreferences,
);

router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER, USER_ROLE.SALES_STAFF),
  UserControllers.getSingleUser,
);

router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  UserControllers.deleteUser,
);

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER, USER_ROLE.SALES_STAFF),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
