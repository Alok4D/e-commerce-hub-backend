"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const config_1 = __importDefault(require("../config"));
const user_constant_1 = require("../modules/user/user.constant");
const user_model_1 = require("../modules/user/user.model");
const settings_model_1 = require("../modules/settings/settings.model");
const category_model_1 = require("../modules/category/category.model");
const product_model_1 = require("../modules/product/product.model");
const coupon_model_1 = require("../modules/coupon/coupon.model");
const superUser = {
    id: 'USR-SUPERADMIN-001',
    name: 'Super Admin',
    email: 'admin@nexora.com.bd',
    phone: '01700000000',
    password: config_1.default.default_password || 'hubmart1234',
    role: user_constant_1.USER_ROLE.SUPER_ADMIN,
    status: 'active',
    isPhoneVerified: true,
    needsPasswordChange: false,
    isDeleted: false,
};
const defaultCategories = [
    {
        name: 'Smart Electronics',
        slug: 'smart-electronics',
        department: 'Consumer Tech',
        subCategories: ['Smartwatches', 'Earbuds', 'Chargers', 'Powerbanks'],
        icon: 'Cpu',
        marketingTags: ['China Direct', 'Trending', 'Best Seller'],
        specTemplates: [
            { fieldName: 'Battery Capacity', inputType: 'text', required: true },
            { fieldName: 'Bluetooth Version', inputType: 'text', required: false },
            { fieldName: 'Warranty', inputType: 'select', required: true, options: ['6 Months', '1 Year', 'No Warranty'] },
        ],
        status: 'ACTIVE',
    },
    {
        name: 'Home & Living',
        slug: 'home-and-living',
        department: 'Home Decor',
        subCategories: ['Diffusers', 'Lighting', 'Organizers'],
        icon: 'Home',
        marketingTags: ['New Arrival', 'Aesthetic'],
        specTemplates: [
            { fieldName: 'Material', inputType: 'text', required: true },
            { fieldName: 'Power Input', inputType: 'text', required: false },
        ],
        status: 'ACTIVE',
    },
    {
        name: 'Fashion Accessories',
        slug: 'fashion-accessories',
        department: 'Lifestyle',
        subCategories: ['Backpacks', 'Wallets', 'Sunglasses'],
        icon: 'Watch',
        marketingTags: ['Premium', 'Waterproof'],
        specTemplates: [
            { fieldName: 'Material', inputType: 'text', required: true },
            { fieldName: 'Color', inputType: 'text', required: true },
        ],
        status: 'ACTIVE',
    },
];
const defaultProducts = [
    {
        title: 'Anker Soundcore Space One ANC Wireless Headphones',
        slug: 'anker-soundcore-space-one-anc',
        sku: 'ANK-SPACE1-BLK',
        category: 'Smart Electronics',
        subCategory: 'Earbuds',
        tags: ['Best Seller', 'China Direct', 'Active Noise Cancelling'],
        price: 8990,
        regularPrice: 10500,
        costPriceRMB: 380,
        costPriceBDT: 6400,
        grossMarginPercent: 28.8,
        stock: 45,
        status: 'ACTIVE',
        wholesaleTiers: [
            { minQty: 5, unitPrice: 8400 },
            { minQty: 20, unitPrice: 7900 },
        ],
        variants: [
            { name: 'Jet Black', sku: 'ANK-SPACE1-BLK', price: 8990, stock: 25 },
            { name: 'Sky Blue', sku: 'ANK-SPACE1-BLU', price: 8990, stock: 20 },
        ],
        specs: [
            { key: 'Noise Cancellation', value: '2X stronger voice reduction with adaptive ANC' },
            { key: 'Playtime', value: '40 Hours with ANC On, 55 Hours Normal' },
            { key: 'Driver Size', value: '40mm Dynamic Audio Drivers' },
            { key: 'Audio Codec', value: 'LDAC Hi-Res Wireless Certified' },
        ],
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: 'High performance active noise cancelling wireless headphones with 40-hour playtime and LDAC lossless sound quality.',
        isFeatured: true,
        isDeleted: false,
    },
    {
        title: 'Baseus 65W GaN5 Pro Fast Charger Desktop Power Station',
        slug: 'baseus-65w-gan5-pro-desktop-charger',
        sku: 'BAS-GAN5-65W',
        category: 'Smart Electronics',
        subCategory: 'Chargers',
        tags: ['Fast Charging', 'Trending', 'Hot'],
        price: 3650,
        regularPrice: 4200,
        costPriceRMB: 145,
        costPriceBDT: 2450,
        grossMarginPercent: 32.8,
        stock: 80,
        status: 'ACTIVE',
        wholesaleTiers: [
            { minQty: 10, unitPrice: 3300 },
            { minQty: 50, unitPrice: 2950 },
        ],
        variants: [
            { name: 'Matte Black', sku: 'BAS-GAN5-65W-BLK', price: 3650, stock: 50 },
            { name: 'Pure White', sku: 'BAS-GAN5-65W-WHT', price: 3650, stock: 30 },
        ],
        specs: [
            { key: 'Output Power', value: '65W Max Multi-port' },
            { key: 'Ports', value: '2x USB-C + 2x USB-A' },
            { key: 'Technology', value: 'GaN5 Pro Semiconductor' },
        ],
        images: [
            'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
        description: 'All-in-one desktop charging hub powered by 5th-gen Gallium Nitride for MacBook, iPhone, and Android devices.',
        isFeatured: true,
        isDeleted: false,
    },
    {
        title: 'Xiaomi Mijia Smart Flame Aroma Humidifier 2026',
        slug: 'xiaomi-mijia-smart-flame-aroma-humidifier',
        sku: 'MI-AROMA-FLAME',
        category: 'Home & Living',
        subCategory: 'Diffusers',
        tags: ['Aesthetic', 'China Direct', 'Pre Order'],
        price: 2450,
        regularPrice: 2990,
        costPriceRMB: 75,
        costPriceBDT: 1265,
        grossMarginPercent: 48.3,
        stock: 12,
        status: 'PRE_ORDER',
        incomingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // in 14 days
        wholesaleTiers: [
            { minQty: 12, unitPrice: 2150 },
        ],
        variants: [],
        specs: [
            { key: 'Tank Capacity', value: '250ml Ultrasonic Mist' },
            { key: 'Lighting', value: '7-color ambient LED simulated flame' },
            { key: 'Noise Level', value: '< 28dB ultra quiet' },
        ],
        images: [
            'https://images.unsplash.com/photo-1608248597359-bb4fc2730bf1?w=800&q=80',
        ],
        thumbnail: 'https://images.unsplash.com/photo-1608248597359-bb4fc2730bf1?w=800&q=80',
        description: 'Simulated warm flame diffuser and aromatherapy mist machine. Next container shipment arriving soon.',
        isFeatured: true,
        isDeleted: false,
    },
];
const seedDatabase = async () => {
    try {
        // 1. Super Admin Seed
        const isSuperAdminExits = await user_model_1.User.findOne({
            phone: superUser.phone,
        });
        if (!isSuperAdminExits) {
            await user_model_1.User.create(superUser);
            console.log('✅ Super Admin account seeded successfully (Phone: 01700000000)');
        }
        // 2. Settings Seed
        const isSettingsExist = await settings_model_1.Settings.findOne();
        if (!isSettingsExist) {
            await settings_model_1.Settings.create({
                rmbExchangeRate: 16.85,
                shippingBufferRmb: 2.5,
                insideDhakaFee: 60,
                outsideDhakaFee: 120,
                freeShippingThreshold: 2000,
                codEnabled: true,
                bkashMerchantNumber: '01800000000',
                supportPhone: '01700-000000',
                supportEmail: 'support@nexora.com.bd',
                auditLogs: [
                    {
                        id: 'LOG-INIT',
                        user: 'System Admin',
                        role: 'SUPER_ADMIN',
                        action: 'System Initialized',
                        category: 'SYSTEM',
                        details: 'Initial configuration seeded with RMB: 16.85 and standard shipping rates.',
                        timestamp: new Date(),
                    },
                ],
            });
            console.log('✅ System Settings seeded successfully');
        }
        // 3. Category Seed
        const categoryCount = await category_model_1.Category.countDocuments();
        if (categoryCount === 0) {
            await category_model_1.Category.insertMany(defaultCategories);
            console.log('✅ Default Categories seeded successfully');
        }
        // 4. Products Seed
        const productCount = await product_model_1.Product.countDocuments();
        if (productCount === 0) {
            await product_model_1.Product.insertMany(defaultProducts);
            console.log('✅ Default Products seeded successfully');
        }
        // 5. Default Coupon Seed
        const welcomeCoupon = await coupon_model_1.Coupon.findOne({ code: 'WELCOME200' });
        if (!welcomeCoupon) {
            await coupon_model_1.Coupon.create({
                code: 'WELCOME200',
                discountType: 'FIXED',
                discountAmount: 200,
                minOrderAmount: 1000,
                validUntil: new Date('2028-12-31'),
                isActive: true,
            });
            console.log('✅ Welcome coupon (WELCOME200) seeded successfully');
        }
    }
    catch (error) {
        console.error('❌ Error during database seeding:', error);
    }
};
exports.seedDatabase = seedDatabase;
