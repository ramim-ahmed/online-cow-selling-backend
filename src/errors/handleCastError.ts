import mongoose from 'mongoose';
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interface/common';

export const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid ID!!',
    },
  ];
  return {
    statusCode: 400,
    message: 'CastError',
    errorMessages: errors,
  };
};
