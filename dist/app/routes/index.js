"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const customer_route_1 = require("../modules/customer/customer.route");
const settings_route_1 = require("../modules/settings/settings.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const analytics_route_1 = require("../modules/analytics/analytics.route");
const marketing_route_1 = require("../modules/marketing/marketing.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/customers',
        route: customer_route_1.CustomerRoutes,
    },
    {
        path: '/coupons',
        route: coupon_route_1.CouponRoutes,
    },
    {
        path: '/settings',
        route: settings_route_1.SettingsRoutes,
    },
    {
        path: '/analytics',
        route: analytics_route_1.AnalyticsRoutes,
    },
    {
        path: '/marketing',
        route: marketing_route_1.MarketingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
