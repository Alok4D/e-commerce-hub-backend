export interface TSocialAccount {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok';
  accountName: string;
  handle: string;
  status: 'Connected' | 'Expired' | 'Disconnected';
  followers: string;
  lastSync: string;
  avatar: string;
}

export interface TSocialPost {
  product: string;
  platform: string;
  status: 'PUBLISHED' | 'QUEUED' | 'FAILED';
  publishedAt: string;
  reach: string;
  clicks: number;
  postUrl?: string;
}

export interface TCampaign {
  title: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  audience: string;
  eligibleCount: number;
  excludedCount: number;
  messageBody: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT';
  scheduledFor?: Date;
  sentAt?: Date;
  deliveredRate?: string;
  createdAt: Date;
}
