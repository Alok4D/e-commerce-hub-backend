"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const user_constant_1 = require("./user.constant");
const savedAddressSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    label: { type: String, default: 'Home' },
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Dhaka' },
    isDefault: { type: Boolean, default: false },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
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
        enum: Object.values(user_constant_1.USER_ROLE),
        default: user_constant_1.USER_ROLE.CUSTOMER,
    },
    status: {
        type: String,
        enum: user_constant_1.UserStatus,
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
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') && user.password) {
        user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    next();
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExistsByCustomId = async function (id) {
    return await this.findOne({ id, isDeleted: false }).select('+password');
};
userSchema.statics.isUserExistsByPhone = async function (phone) {
    return await this.findOne({ phone, isDeleted: false }).select('+password');
};
userSchema.statics.isUserExistsByEmail = async function (email) {
    return await this.findOne({ email, isDeleted: false }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
