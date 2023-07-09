import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/IPaginationOptions';
import { cowSearchableFields } from './cow.constants';
import { ICow, ICowFilterableFields } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload);
  return result;
};

const getAllCows = async (
  filters: ICowFilterableFields,
  payload: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(payload);
  const { searchTerm, ...filterAbleData } = filters;

  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: cowSearchableFields.map(field => ({
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
  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  updateFields: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, updateFields, {
    new: true,
  }).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};
