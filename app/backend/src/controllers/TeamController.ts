import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import httpStatusMapper from '../utils/httpStatusMapper';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();
    res.status(httpStatusMapper(status)).json(data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    res.status(httpStatusMapper(status)).json(data);
  }
}
