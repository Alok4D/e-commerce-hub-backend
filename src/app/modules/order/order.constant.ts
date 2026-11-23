export const OrderSearchableFields = [
  'orderNumber',
  'customer.name',
  'customer.phone',
  'customer.address',
  'courier.trackingCode',
  'courier.consignmentId',
];

export const OrderStatusList = [
  'PENDING',
  'CONFIRMED',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
] as const;

export const PaymentStatusList = ['PENDING', 'PAID', 'FAILED'] as const;
export const PaymentMethodList = ['COD', 'BKASH', 'CARD'] as const;
