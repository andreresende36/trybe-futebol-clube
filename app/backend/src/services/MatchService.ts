import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { IMatch } from '../Interfaces/matches/IMatch';
// import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ID, NewEntity } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import calculateTeamStats from '../utils/calculateTeamsStats';
import { ITeamsStats } from '../Interfaces/teams/ITeamStats';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
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

  async createMatch(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = data;
    const team1 = await this.teamModel.findById(homeTeamId);
    const team2 = await this.teamModel.findById(awayTeamId);

    if (team1 && team2) {
      const newMatch = await this.matchModel.create({ ...data, inProgress: true });
      return { status: 'CREATED', data: newMatch };
    }

    return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
  }

  async getLeaderboardHomeOrAway(homeOrAway: string): Promise<ServiceResponse<ITeamsStats[]>> {
    const teams = await this.teamModel.findAll();
    const finishedMatchesGroupedByTeamId = await Promise.all(teams.map(
      async ({ id: teamId }) => {
        const matches = await this.matchModel
          .findFinishedMatchesByTeamIdAndHomeOrAway(teamId, homeOrAway);
        return matches;
      },
    ));
    const leaderboard = calculateTeamStats(finishedMatchesGroupedByTeamId, teams);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  async getLeaderboard(): Promise<ServiceResponse<ITeamsStats[]>> {
    const teams = await this.teamModel.findAll();
    const finishedMatchesGroupedByTeamId = await Promise.all(teams.map(
      async ({ id: teamId }) => {
        const matches = await this.matchModel
          .findFinishedMatchesByTeamId(teamId);
        return matches;
      },
    ));
    const leaderboard = calculateTeamStats(finishedMatchesGroupedByTeamId, teams);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
