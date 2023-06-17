import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import httpStatusMapper from '../utils/httpStatusMapper';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.matchService.getAllMatches(inProgress as string);
    res.status(httpStatusMapper(status)).json(data);
  }

  async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.getMatchById(Number(id));
    res.status(httpStatusMapper(status)).json(data);
  }
}
