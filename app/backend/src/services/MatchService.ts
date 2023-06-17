import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ID } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  async getAllMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getMatchById(id: ID): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  async finishMatch(
    id: ID,
    inProgressStatus: Partial<IMatch>,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.update(id, inProgressStatus);
    return { status: 'SUCCESSFUL', data: { message: 'finished' } };
  }

  async updateMatch(
    id: ID,
    newData: Partial<IMatch>,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.update(id, newData);
    return { status: 'SUCCESSFUL', data: { message: 'updated' } };
  }
}
