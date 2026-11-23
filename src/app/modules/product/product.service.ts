import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';

const createProductIntoDB = async (payload: TProduct) => {
  const isSkuExist = await Product.findOne({ sku: payload.sku });
  if (isSkuExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product with this SKU already exists!');
  }

  const isSlugExist = await Product.findOne({ slug: payload.slug });
  if (isSlugExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product with this slug already exists!');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // Support custom filter queries like minPrice, maxPrice, category, tag
  const queryObj = { ...query };
  const filterConditions: Record<string, unknown> = { isDeleted: false };

  if (queryObj.category && queryObj.category !== 'all') {
    filterConditions.category = new RegExp(String(queryObj.category), 'i');
  }

  if (queryObj.tag) {
    filterConditions.tags = { $in: [queryObj.tag] };
  }

  if (queryObj.status && queryObj.status !== 'all') {
    filterConditions.status = queryObj.status;
  }

  if (queryObj.minPrice || queryObj.maxPrice) {
    const priceCondition: Record<string, number> = {};
    if (queryObj.minPrice) priceCondition.$gte = Number(queryObj.minPrice);
    if (queryObj.maxPrice) priceCondition.$lte = Number(queryObj.maxPrice);
    filterConditions.price = priceCondition;
  }

  const productQuery = new QueryBuilder(Product.find(filterConditions), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const count = await Product.countDocuments(filterConditions);

  return {
    meta: {
      total: count,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    },
    data: result,
  };
};

const getSingleProductFromDB = async (idOrSlug: string) => {
  let result = null;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    result = await Product.findOne({ _id: idOrSlug, isDeleted: false });
  }
  if (!result) {
    result = await Product.findOne({ slug: idOrSlug, isDeleted: false });
  }

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

const archiveProductIntoDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { status: 'ARCHIVED' },
    { new: true },
  );
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  archiveProductIntoDB,
};
