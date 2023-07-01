import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/IPaginationOptions';
import { userSearchableFields } from './user.contants';
import { IUser, IUserFilter } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  if (!payload.password) {
    payload.password = '123456';
  }
  const result = await User.create(payload);
  return result;
};
const getAllUsers = async (
  filters: IUserFilter,
  payload: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(payload);
  const { searchTerm, ...filterAbleData } = filters;

  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterAbleData).length) {
    searchCondition.push({
      $and: Object.entries(filterAbleData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: 'i',
        },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    searchCondition.length > 0 ? { $and: searchCondition } : {};
  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const UserService = {
  createUser,
  getAllUsers,
};
