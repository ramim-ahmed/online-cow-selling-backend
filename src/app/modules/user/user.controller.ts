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

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'user retrived is successfully!!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);
  sendResponse<IUser>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'user updated is successfully!!',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'user deleted is successfully!!',
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
