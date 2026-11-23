import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TNotificationPreferences, TSavedAddress, TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const existingUserByPhone = await User.isUserExistsByPhone(payload.phone as string);
  if (existingUserByPhone) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User with this phone number already exists!');
  }

  if (payload.email) {
    const existingUserByEmail = await User.isUserExistsByEmail(payload.email);
    if (existingUserByEmail) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User with this email already exists!');
    }
  }

  const customId = `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  payload.id = customId;

  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({ isDeleted: false }), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const count = await User.countDocuments({ isDeleted: false });

  return {
    meta: {
      total: count,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    },
    data: result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const getMyProfileFromDB = async (userId: string) => {
  const result = await User.findOne({ id: userId, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const updateMyProfileIntoDB = async (userId: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ id: userId, isDeleted: false }, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ id, isDeleted: false }, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return result;
};

const addSavedAddressIntoDB = async (userId: string, addressData: Omit<TSavedAddress, 'id'>) => {
  const user = await User.findOne({ id: userId, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const newAddress: TSavedAddress = {
    ...addressData,
    id: `ADDR-${Date.now()}`,
  };

  if (newAddress.isDefault) {
    user.savedAddresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.savedAddresses.push(newAddress);
  await user.save();
  return user.savedAddresses;
};

const deleteSavedAddressFromDB = async (userId: string, addressId: string) => {
  const user = await User.findOne({ id: userId, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  user.savedAddresses = user.savedAddresses.filter((a) => a.id !== addressId);
  await user.save();
  return user.savedAddresses;
};

const updatePreferencesIntoDB = async (userId: string, preferences: Partial<TNotificationPreferences>) => {
  const user = await User.findOne({ id: userId, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  user.preferences = {
    ...user.preferences,
    ...preferences,
  };

  await user.save();
  return user.preferences;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getMyProfileFromDB,
  updateMyProfileIntoDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addSavedAddressIntoDB,
  deleteSavedAddressFromDB,
  updatePreferencesIntoDB,
};
