import { z } from 'zod';
import { UserRole } from './user.contants';

const createUserValidatorWithZod = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phone number is required!',
    }),
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'role is required!',
    }),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'first name is required!',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'last name is required!',
      }),
    }),
    address: z.string({
      required_error: 'address is required!',
    }),
    budget: z.number({
      required_error: 'budget is required!',
    }),
    income: z.number({
      required_error: 'income is required!',
    }),
  }),
});

const updateUserValidatorWithZod = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidator = {
  createUserValidatorWithZod,
  updateUserValidatorWithZod,
};
