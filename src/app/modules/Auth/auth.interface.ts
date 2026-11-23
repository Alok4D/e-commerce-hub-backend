export type TLoginUser = {
  identifier: string; // phone or email or user id
  password: string;
};

export type TRegisterUser = {
  name: string;
  phone: string;
  email?: string;
  password: string;
  address?: string;
  city?: string;
};

export type TVerifyPhone = {
  phone: string;
  otp: string;
};
