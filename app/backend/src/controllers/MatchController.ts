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

  async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this.matchService.finishMatch(id, { inProgress: false });
    return res.status(httpStatusMapper(status)).json(data);
  }

  async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this.matchService.updateMatch(id, req.body);
    return res.status(httpStatusMapper(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService.createMatch(req.body);
    return res.status(httpStatusMapper(status)).json(data);
  }

  async getLeaderboardHomeOrAway(req: Request, res: Response) {
    const { homeOrAway } = req.params;
    const { status, data } = await this.matchService.getLeaderboardHomeOrAway(homeOrAway);
    return res.status(httpStatusMapper(status)).json(data);
  }

  async getLeaderboard(req: Request, res: Response) {
    const { status, data } = await this.matchService.getLeaderboard();
    return res.status(httpStatusMapper(status)).json(data);
  }
}
