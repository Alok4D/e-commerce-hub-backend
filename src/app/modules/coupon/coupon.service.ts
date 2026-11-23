import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  const isExist = await Coupon.findOne({ code: payload.code.toUpperCase(), isDeleted: false });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Coupon code already exists!');
  }

  const result = await Coupon.create({
    ...payload,
    code: payload.code.toUpperCase(),
  });
  return result;
};

const getAllCouponsFromDB = async () => {
  const result = await Coupon.find({ isDeleted: false }).sort('-createdAt');
  return result;
};

const applyCoupon = async (code: string, orderSubtotal: number) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isDeleted: false,
    isActive: true,
  });

  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid or expired coupon code!');
  }

  // Check expiration
  if (new Date() > new Date(coupon.validUntil)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This coupon code has expired!');
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This coupon code has reached its usage limit!');
  }

  // Check minimum order amount
  if (orderSubtotal < coupon.minOrderAmount) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Minimum order of ৳${coupon.minOrderAmount} required for this coupon!`,
    );
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discountType === 'FIXED') {
    discount = coupon.discountAmount;
  } else {
    discount = (orderSubtotal * coupon.discountAmount) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  }

  discount = Math.min(discount, orderSubtotal);

  return {
    valid: true,
    code: coupon.code,
    discountAmount: Math.round(discount),
    message: `৳${Math.round(discount)} discount applied via code ${coupon.code}`,
  };
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found!');
  }
  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  applyCoupon,
  deleteCouponFromDB,
};
