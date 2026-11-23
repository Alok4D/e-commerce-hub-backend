export type TAuditLog = {
  id: string;
  user: string;
  role: string;
  action: string;
  category: string;
  details: string;
  timestamp: Date;
};

export interface TSettings {
  rmbExchangeRate: number;
  shippingBufferRmb: number;
  insideDhakaFee: number;
  outsideDhakaFee: number;
  freeShippingThreshold: number;
  codEnabled: boolean;
  bkashMerchantNumber?: string;
  supportPhone?: string;
  supportEmail?: string;
  auditLogs: TAuditLog[];
}
