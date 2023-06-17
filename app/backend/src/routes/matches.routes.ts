import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/validateToken';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.get('/:id', (req: Request, res: Response) => matchController.getMatchById(req, res));
router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;
