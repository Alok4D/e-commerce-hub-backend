import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TSavedAddress = {
  id: string;
  label: string; // 'Home' | 'Office' | 'Other'
  recipientName: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
};

export type TNotificationPreferences = {
  whatsappUpdates: boolean;
  emailMarketing: boolean;
  smsTracking: boolean;
};

export interface TUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  password?: string;
  role: TUserRole;
  status: 'active' | 'blocked' | 'pending';
  isPhoneVerified: boolean;
  phoneOtp?: string;
  phoneOtpExpires?: Date;
  avatar?: string;
  address?: string;
  city?: string;
  savedAddresses: TSavedAddress[];
  preferences: TNotificationPreferences;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser | null>;
  isUserExistsByPhone(phone: string): Promise<TUser | null>;
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
