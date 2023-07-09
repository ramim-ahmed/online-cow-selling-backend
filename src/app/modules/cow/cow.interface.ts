import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export enum CowCategory {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensign';

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: IBreed;
  weight: number;
  label: 'for sale' | 'sold out';
  category: CowCategory;
  seller: Types.ObjectId | IUser;
};

export type ICowFilterableFields = {
  searchTerm?: string;
  id?: string;
  name?: string;
  age?: number;
  price?: number;
  category?: string;
  location?: string;
  weight?: number;
};
export type CowModel = Model<ICow, Record<string, unknown>>;
