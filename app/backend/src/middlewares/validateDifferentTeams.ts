import { Request, Response, NextFunction } from 'express';
import httpStatusMapper from '../utils/httpStatusMapper';

const validateDifferentTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(
      httpStatusMapper('UNPROCESSABLE ENTITY'),
    ).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

export default validateDifferentTeams;
