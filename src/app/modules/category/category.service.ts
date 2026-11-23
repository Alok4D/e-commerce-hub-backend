import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { CategorySearchableFields } from './category.constant';

const createCategoryIntoDB = async (payload: TCategory) => {
  const existingCategory = await Category.findOne({ slug: payload.slug });
  if (existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category with this slug already exists!');
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find({ isDeleted: false }), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const count = await Category.countDocuments({ isDeleted: false });

  return {
    meta: {
      total: count,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    },
    data: result,
  };
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }
  return result;
};

const updateCategoryIntoDB = async (id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
