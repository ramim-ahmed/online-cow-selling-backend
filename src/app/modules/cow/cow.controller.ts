import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { cowFilterableFields } from './cow.constants';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow } = req.body;
  const result = await CowService.createCow(cow);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Cow created is successfully!!',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowService.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'cows is retrived successfully!!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);
  sendResponse<ICow>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'cow retrived is successfully!!',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.deleteCow(id);
  sendResponse<ICow>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'cow deleted is successfully!!',
    data: result,
  });
});
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const result = await CowService.updateCow(id, updatedFields);
  sendResponse<ICow>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'cow updated is successfully!!',
    data: result,
  });
});
export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
  updateCow,
};
