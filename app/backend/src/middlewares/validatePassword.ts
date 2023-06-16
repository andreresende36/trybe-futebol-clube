import { Request, Response, NextFunction } from 'express';
import httpStatusMapper from '../utils/httpStatusMapper';

const validatePassword = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { password } = req.body;
  if (!password) {
    return res.status(httpStatusMapper('INVALID_DATA')).json(
      { message: 'All fields must be filled' },
    );
  }

  if (password.length < 6) {
    return res.status(httpStatusMapper('UNAUTHORIZED')).json(
      { message: 'Invalid email or password' },
    );
  }
  next();
};

export default validatePassword;
