import { Campaign, SocialAccount, SocialPost } from './marketing.model';
import { TCampaign, TSocialPost } from './marketing.interface';

const getSocialAccountsFromDB = async () => {
  let accounts = await SocialAccount.find();
  if (accounts.length === 0) {
    accounts = await SocialAccount.create([
      {
        id: 'sa-1',
        platform: 'Facebook',
        accountName: 'Nexora Retail Bangladesh',
        handle: '@nexorabd.official',
        status: 'Connected',
        followers: '42.8K followers',
        lastSync: 'Today, 11:20 AM',
        avatar: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'sa-2',
        platform: 'Instagram',
        accountName: 'Nexora Life & Gadgets',
        handle: '@nexora.bd',
        status: 'Connected',
        followers: '18.5K followers',
        lastSync: 'Today, 10:45 AM',
        avatar: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=120&q=80',
      },
      {
        id: 'sa-3',
        platform: 'TikTok',
        accountName: 'Nexora Import Hub',
        handle: '@nexora_live',
        status: 'Disconnected',
        followers: '8.2K followers',
        lastSync: 'Not connected',
        avatar: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&w=120&q=80',
      },
    ]);
  }
  return accounts;
};

const getSocialPostsFromDB = async () => {
  let posts = await SocialPost.find().sort('-createdAt');
  if (posts.length === 0) {
    posts = await SocialPost.create([
      {
        product: 'Anker Soundcore Space One ANC Wireless Headphones',
        platform: 'Facebook Page & Instagram',
        status: 'PUBLISHED',
        publishedAt: 'Today, 10:30 AM',
        reach: '1,240 people',
        clicks: 86,
        postUrl: 'https://facebook.com',
      },
      {
        product: 'Baseus 65W GaN5 Pro Fast Charger Desktop Power Station',
        platform: 'Instagram',
        status: 'PUBLISHED',
        publishedAt: 'Yesterday, 4:15 PM',
        reach: '890 impressions',
        clicks: 42,
        postUrl: 'https://instagram.com',
      },
    ]);
  }
  return posts;
};

const createSocialPostIntoDB = async (payload: TSocialPost) => {
  const result = await SocialPost.create(payload);
  return result;
};

const getCampaignsFromDB = async () => {
  let campaigns = await Campaign.find().sort('-createdAt');
  if (campaigns.length === 0) {
    campaigns = await Campaign.create([
      {
        title: 'New audio collection',
        channel: 'WhatsApp',
        audience: 'Gadget buyers · Opted in',
        eligibleCount: 342,
        excludedCount: 28,
        messageBody: 'Hi! Discover our Wireless ANC Headphones with ৳200 off code WELCOME200.',
        status: 'SENT',
        deliveredRate: 'Delivered 318 / 342 · 93%',
      },
      {
        title: 'Weekend essentials offer',
        channel: 'SMS',
        audience: 'VIP customers · Opted in',
        eligibleCount: 86,
        excludedCount: 4,
        messageBody: 'Enjoy exclusive weekend savings across Home & Living essentials.',
        status: 'SENT',
        deliveredRate: 'Delivered 82 / 86 · 95%',
      },
    ]);
  }
  return campaigns;
};

const createCampaignIntoDB = async (payload: TCampaign) => {
  const result = await Campaign.create(payload);
  return result;
};

export const MarketingServices = {
  getSocialAccountsFromDB,
  getSocialPostsFromDB,
  createSocialPostIntoDB,
  getCampaignsFromDB,
  createCampaignIntoDB,
};
