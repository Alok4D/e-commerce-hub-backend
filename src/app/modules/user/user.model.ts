/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TSavedAddress, TUser, UserModel } from './user.interface';
import { USER_ROLE, UserStatus } from './user.constant';

const savedAddressSchema = new Schema<TSavedAddress>(
  {
    id: { type: String, required: true },
    label: { type: String, default: 'Home' },
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Dhaka' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.CUSTOMER,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneOtp: {
      type: String,
      select: 0,
    },
    phoneOtpExpires: {
      type: Date,
      select: 0,
    },
    avatar: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Dhaka',
    },
    savedAddresses: {
      type: [savedAddressSchema],
      default: [],
    },
    preferences: {
      whatsappUpdates: { type: Boolean, default: true },
      emailMarketing: { type: Boolean, default: true },
      smsTracking: { type: Boolean, default: true },
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') && user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findOne({ id, isDeleted: false }).select('+password');
};

userSchema.statics.isUserExistsByPhone = async function (phone: string) {
  return await this.findOne({ phone, isDeleted: false }).select('+password');
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email, isDeleted: false }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
