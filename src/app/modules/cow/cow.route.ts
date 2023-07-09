import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidator } from './cow.validation';
const router = express.Router();
router.post(
  '/create-cow',
  validateRequest(CowValidator.createCowValidatorWithZod),
  CowController.createCow
);
router.get('/:id', CowController.getSingleCow);
router.delete('/:id', CowController.deleteCow);
router.patch(
  '/:id',
  validateRequest(CowValidator.updateCowValidationWithZod),
  CowController.updateCow
);
router.get('/', CowController.getAllCows);
export const CowRoutes = router;
