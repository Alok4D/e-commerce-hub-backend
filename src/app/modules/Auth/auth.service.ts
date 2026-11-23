import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { USER_ROLE } from '../user/user.constant';
import { TLoginUser, TRegisterUser, TVerifyPhone } from './auth.interface';
import { createToken } from './auth.utlis';

const registerUser = async (payload: TRegisterUser) => {
  const existingUserByPhone = await User.isUserExistsByPhone(payload.phone);
  if (existingUserByPhone) {
    throw new AppError(httpStatus.BAD_REQUEST, 'A user with this phone number already exists!');
  }

  if (payload.email) {
    const existingUserByEmail = await User.isUserExistsByEmail(payload.email);
    if (existingUserByEmail) {
      throw new AppError(httpStatus.BAD_REQUEST, 'A user with this email already exists!');
    }
  }

  const customId = `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Default mock OTP for demonstration / SMS gateway
  const phoneOtp = '123456';
  const phoneOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newUser = await User.create({
    ...payload,
    id: customId,
    role: USER_ROLE.CUSTOMER,
    status: 'active',
    isPhoneVerified: false,
    phoneOtp,
    phoneOtpExpires,
  });

  const jwtPayload = {
    userId: newUser.id,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

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

const loginUser = async (payload: TLoginUser) => {
  const { identifier, password } = payload;

  // Find user by phone, email, or custom id
  let user = await User.findOne({ phone: identifier, isDeleted: false }).select('+password');
  if (!user && identifier.includes('@')) {
    user = await User.findOne({ email: identifier.toLowerCase(), isDeleted: false }).select('+password');
  }
  if (!user) {
    user = await User.findOne({ id: identifier, isDeleted: false }).select('+password');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials: User does not exist!');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your account has been blocked! Please contact support.');
  }

  const isPasswordMatch = await User.isPasswordMatched(password, user.password as string);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials: Password incorrect!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

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

const verifyPhoneOtp = async (payload: TVerifyPhone) => {
  const user = await User.findOne({ phone: payload.phone, isDeleted: false }).select('+phoneOtp +phoneOtpExpires');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User with this phone not found!');
  }

  // Allow standard demo OTP '123456' or matched OTP
  if (payload.otp !== '123456' && user.phoneOtp !== payload.otp) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP code entered!');
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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ id: userData.userId, isDeleted: false }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const isPasswordMatch = await User.isPasswordMatched(payload.oldPassword, user.password as string);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Old password does not match!');
  }

  user.password = payload.newPassword;
  user.needsPasswordChange = false;
  user.passwordChangedAt = new Date();
  await user.save();

  return {
    message: 'Password updated successfully!',
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
  const { userId, iat } = decoded;

  const user = await User.findOne({ id: userId, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token expired because password was changed!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  verifyPhoneOtp,
  changePassword,
  refreshToken,
};
