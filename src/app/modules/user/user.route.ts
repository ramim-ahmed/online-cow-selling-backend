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
router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
