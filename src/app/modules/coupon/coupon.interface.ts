export type TDiscountType = 'FIXED' | 'PERCENTAGE';

export interface TCoupon {
  code: string;
  discountType: TDiscountType;
  discountAmount: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  isDeleted: boolean;
}
