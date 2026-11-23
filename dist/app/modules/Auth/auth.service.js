"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const user_constant_1 = require("../user/user.constant");
const auth_utlis_1 = require("./auth.utlis");
const registerUser = async (payload) => {
    const existingUserByPhone = await user_model_1.User.isUserExistsByPhone(payload.phone);
    if (existingUserByPhone) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'A user with this phone number already exists!');
    }
    if (payload.email) {
        const existingUserByEmail = await user_model_1.User.isUserExistsByEmail(payload.email);
        if (existingUserByEmail) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'A user with this email already exists!');
        }
    }
    const customId = `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // Default mock OTP for demonstration / SMS gateway
    const phoneOtp = '123456';
    const phoneOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const newUser = await user_model_1.User.create({
        ...payload,
        id: customId,
        role: user_constant_1.USER_ROLE.CUSTOMER,
        status: 'active',
        isPhoneVerified: false,
        phoneOtp,
        phoneOtpExpires,
    });
    const jwtPayload = {
        userId: newUser.id,
        role: newUser.role,
    };
    const accessToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user: {
            id: newUser.id,
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            role: newUser.role,
            isPhoneVerified: newUser.isPhoneVerified,
        },
        demoOtp: '123456',
    };
};
const loginUser = async (payload) => {
    const { identifier, password } = payload;
    // Find user by phone, email, or custom id
    let user = await user_model_1.User.findOne({ phone: identifier, isDeleted: false }).select('+password');
    if (!user && identifier.includes('@')) {
        user = await user_model_1.User.findOne({ email: identifier.toLowerCase(), isDeleted: false }).select('+password');
    }
    if (!user) {
        user = await user_model_1.User.findOne({ id: identifier, isDeleted: false }).select('+password');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid credentials: User does not exist!');
    }
    if (user.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Your account has been blocked! Please contact support.');
    }
    const isPasswordMatch = await user_model_1.User.isPasswordMatched(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid credentials: Password incorrect!');
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
            isPhoneVerified: user.isPhoneVerified,
            avatar: user.avatar,
        },
    };
};
const verifyPhoneOtp = async (payload) => {
    const user = await user_model_1.User.findOne({ phone: payload.phone, isDeleted: false }).select('+phoneOtp +phoneOtpExpires');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User with this phone not found!');
    }
    // Allow standard demo OTP '123456' or matched OTP
    if (payload.otp !== '123456' && user.phoneOtp !== payload.otp) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid OTP code entered!');
    }
    user.isPhoneVerified = true;
    user.phoneOtp = undefined;
    user.phoneOtpExpires = undefined;
    await user.save();
    return {
        verified: true,
        message: 'Phone number verified successfully!',
    };
};
const changePassword = async (userData, payload) => {
    const user = await user_model_1.User.findOne({ id: userData.userId, isDeleted: false }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const isPasswordMatch = await user_model_1.User.isPasswordMatched(payload.oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Old password does not match!');
    }
    user.password = payload.newPassword;
    user.needsPasswordChange = false;
    user.passwordChangedAt = new Date();
    await user.save();
    return {
        message: 'Password updated successfully!',
    };
};
const refreshToken = async (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = await user_model_1.User.findOne({ id: userId, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    if (user.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User is blocked!');
    }
    if (user.passwordChangedAt && user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Token expired because password was changed!');
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
};
exports.AuthServices = {
    registerUser,
    loginUser,
    verifyPhoneOtp,
    changePassword,
    refreshToken,
};
