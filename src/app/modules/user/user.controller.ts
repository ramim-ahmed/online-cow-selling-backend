import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
const createUser = catchAsync(async (req, res) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User created is successfully!!',
    data: result,
  });
});

export const UserController = {
  createUser,
};
