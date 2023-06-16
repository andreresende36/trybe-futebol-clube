import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  email: string,
  userId: number,
};

const sign = (payload: TokenPayload): string => jwt.sign(payload, secret);

const verifyToken = (token: string):string | JwtPayload => jwt.verify(token, secret);

export default {
  sign,
  verifyToken,
};
