import express from 'express';
import auth from '../../middlwares/auth';
import validateRequest from '../../middlwares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.patch(
  '/:id/archive',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.CATALOG_MANAGER),
  ProductControllers.archiveProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;
