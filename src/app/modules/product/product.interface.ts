export type TProductStatus =
  | 'ACTIVE'
  | 'LOW_STOCK'
  | 'PRE_ORDER'
  | 'OUT_OF_STOCK'
  | 'DRAFT'
  | 'ARCHIVED';

export type TWholesaleTier = {
  minQty: number;
  unitPrice: number;
};

export type TProductVariant = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes?: Record<string, string>;
};

export type TProductSpec = {
  key: string;
  value: string;
};

export interface TProduct {
  title: string;
  slug: string;
  sku: string;
  category: string;
  subCategory?: string;
  tags: string[];
  price: number;
  regularPrice: number;
  costPriceRMB: number;
  costPriceBDT: number;
  grossMarginPercent: number;
  stock: number;
  status: TProductStatus;
  incomingDate?: Date;
  wholesaleTiers: TWholesaleTier[];
  variants: TProductVariant[];
  specs: TProductSpec[];
  images: string[];
  thumbnail: string;
  description?: string;
  videoUrl?: string;
  weight?: number;
  isFeatured: boolean;
  isDeleted: boolean;
}
