"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserSearchableFields = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    CATALOG_MANAGER: 'CATALOG_MANAGER',
    SALES_STAFF: 'SALES_STAFF',
    CUSTOMER: 'CUSTOMER',
};
exports.UserSearchableFields = ['name', 'email', 'phone', 'id'];
exports.UserStatus = ['active', 'blocked', 'pending'];
