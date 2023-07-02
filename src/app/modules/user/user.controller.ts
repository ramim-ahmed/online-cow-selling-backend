import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { userFilterableFields } from './user.contants';
import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/paginationFields';
import { pick } from '../../../shared/pick';
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User created is successfully!!',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User is retrived successfully!!',
    meta: result.meta,
    data: result.data,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
};
