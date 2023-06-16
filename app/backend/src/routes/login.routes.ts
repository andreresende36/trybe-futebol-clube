import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';
import validateToken from '../middlewares/validateToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  (req: Request, res: Response) => userController.login(req, res),
);
router.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default router;
