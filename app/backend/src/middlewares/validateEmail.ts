import { Request, Response, NextFunction } from 'express';
import httpStatusMapper from '../utils/httpStatusMapper';

const validateEmail = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { email } = req.body;
  if (!email) {
    return res.status(httpStatusMapper('INVALID_DATA')).json(
      { message: 'All fields must be filled' },
    );
  }

  const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regexEmail.test(email)) {
    return res.status(httpStatusMapper('UNAUTHORIZED')).json(
      { message: 'Invalid email or password' },
    );
  }
  next();
};

export default validateEmail;
