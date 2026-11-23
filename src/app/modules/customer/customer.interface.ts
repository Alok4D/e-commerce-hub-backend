export type TCustomerNote = {
  text: string;
  staffName: string;
  createdAt: Date;
};

export type TCustomerTimeline = {
  date: Date;
  type: 'ORDER' | 'CALL' | 'NOTE' | 'WHATSAPP';
  title: string;
  details: string;
  staffName?: string;
};

export type TCustomerFollowUp = {
  id: string;
  dueDate: Date;
  task: string;
  completed: boolean;
  assignee: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
};

export interface TCustomer {
  phone: string;
  name: string;
  email?: string;
  address?: string;
  city?: string;
  tags: string[];
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderDate?: Date;
  notes: TCustomerNote[];
  timeline: TCustomerTimeline[];
  followUps: TCustomerFollowUp[];
  isDeleted: boolean;
}
