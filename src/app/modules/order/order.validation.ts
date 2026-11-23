import { z } from 'zod';
import {
  OrderStatusList,
  PaymentMethodList,
  PaymentStatusList,
} from './order.constant';

const createOrderValidationSchema = z.object({
  body: z.object({
    customer: z.object({
      name: z.string({ required_error: 'Customer name is required' }),
      phone: z
        .string({ required_error: 'Customer phone is required' })
        .regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladeshi mobile number'),
      email: z.string().email().optional(),
      address: z.string({ required_error: 'Delivery address is required' }),
      city: z.string().default('Dhaka'),
    }),
    items: z
      .array(
        z.object({
          productId: z.string({ required_error: 'Product ID is required' }),
          title: z.string({ required_error: 'Product title is required' }),
          price: z.number().nonnegative(),
          quantity: z.number().positive(),
          image: z.string().optional(),
          variant: z.string().optional(),
          sku: z.string().optional(),
        }),
      )
      .min(1, 'Order must contain at least one item'),
    subtotal: z.number().nonnegative(),
    deliveryFee: z.number().nonnegative().default(60),
    discount: z.number().nonnegative().default(0),
    couponCode: z.string().optional(),
    total: z.number().nonnegative(),
    paymentMethod: z.enum(PaymentMethodList).default('COD'),
    notes: z.string().optional(),
  }),
});

const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    orderStatus: z.enum(OrderStatusList).optional(),
    paymentStatus: z.enum(PaymentStatusList).optional(),
    courier: z
      .object({
        name: z.enum(['Pathao', 'Steadfast', 'RedX', 'Paperfly', 'Self']),
        trackingCode: z.string().optional(),
        consignmentId: z.string().optional(),
        status: z.string().optional(),
      })
      .optional(),
    note: z.string().optional(),
  }),
});

const cancelOrderValidationSchema = z.object({
  body: z.object({
    reason: z.string({ required_error: 'Cancellation reason is required' }).min(3),
  }),
});

const returnOrderValidationSchema = z.object({
  body: z.object({
    reason: z.string({ required_error: 'Return reason is required' }).min(3),
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderStatusValidationSchema,
  cancelOrderValidationSchema,
  returnOrderValidationSchema,
};
