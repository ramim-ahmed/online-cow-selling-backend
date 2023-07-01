import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidator } from './user.validation';
const router = express.Router();
router.post(
  '/create-user',
  validateRequest(UserValidator.createUserValidatorWithZod),
  UserController.createUser
);

export const UserRoutes = router;
