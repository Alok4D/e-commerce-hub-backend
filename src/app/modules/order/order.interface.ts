import { Types } from 'mongoose';

export type TPaymentMethod = 'COD' | 'BKASH' | 'CARD';
export type TPaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type TOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type TOrderItem = {
  productId: Types.ObjectId | string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  sku?: string;
};

export type TOrderCustomer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
};

export type TOrderCourier = {
  name: 'Pathao' | 'Steadfast' | 'RedX' | 'Paperfly' | 'Self';
  trackingCode?: string;
  consignmentId?: string;
  status?: string;
};

export type TOrderHistory = {
  status: TOrderStatus;
  changedAt: Date;
  changedBy?: string;
  note?: string;
};

export interface TOrder {
  orderNumber: string;
  user?: Types.ObjectId | string;
  customer: TOrderCustomer;
  items: TOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: TPaymentMethod;
  paymentStatus: TPaymentStatus;
  orderStatus: TOrderStatus;
  courier?: TOrderCourier;
  cancellationReason?: string;
  returnReason?: string;
  notes?: string;
  history: TOrderHistory[];
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
