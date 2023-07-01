import { Model } from 'mongoose';
export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
};

export type IUserFilter = {
  searchTerm?: string;
  id?: string;
  address?: string;
  phoneNumber?: string;
  role?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
