export const USER_ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CATALOG_MANAGER: 'CATALOG_MANAGER',
  SALES_STAFF: 'SALES_STAFF',
  CUSTOMER: 'CUSTOMER',
} as const;

export const UserSearchableFields = ['name', 'email', 'phone', 'id'];

export const UserStatus = ['active', 'blocked', 'pending'] as const;
