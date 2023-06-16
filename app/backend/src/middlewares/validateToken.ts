import { Request, Response, NextFunction } from 'express';
import jwtUtils from '../utils/jwtUtils';
import httpStatusMapper from '../utils/httpStatusMapper';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(httpStatusMapper('UNAUTHORIZED')).json({ message: 'Token not found' });
  }
  try {
    const payload = jwtUtils.verifyToken(token);
    req.body.payload = payload;
    return next();
  } catch (error) {
    return res.status(
      httpStatusMapper('UNAUTHORIZED'),
    ).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
