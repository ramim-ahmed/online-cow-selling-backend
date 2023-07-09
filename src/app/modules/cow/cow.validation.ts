import { z } from 'zod';
import { breed, label, location } from './cow.constants';
import { CowCategory } from './cow.interface';

const createCowValidatorWithZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required!',
    }),
    age: z.number({
      required_error: 'age is required!',
    }),
    price: z.number({
      required_error: 'price is required!',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location is required!',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'breed is required!',
    }),
    weight: z.number({
      required_error: 'weight is required!',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'label is required!',
    }),
    category: z.enum(
      [CowCategory.Dairy, CowCategory.Beef, CowCategory.DualPurpose],
      {
        required_error: 'category is required!',
      }
    ),
    seller: z.string({
      required_error: 'seller is required!',
    }),
  }),
});

const updateCowValidationWithZod = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z
      .enum([CowCategory.Dairy, CowCategory.Beef, CowCategory.DualPurpose])
      .optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidator = {
  createCowValidatorWithZod,
  updateCowValidationWithZod,
};
