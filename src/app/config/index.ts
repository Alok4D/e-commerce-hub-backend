import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
  default_password: process.env.DEFAULT_PASS || 'hubmart1234',
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'nexora_ecommerce_hub_jwt_access_secret_2026',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'nexora_ecommerce_hub_jwt_refresh_secret_2026',
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '7d',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  client_url: process.env.CLIENT_URL || 'http://localhost:3000',
};
