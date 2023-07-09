import { UserRoutes } from '../app/modules/user/user.route';
import express from 'express';
import { CowRoutes } from '../app/modules/cow/cow.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cow',
    route: CowRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route?.path, route?.route);
});
export default router;
