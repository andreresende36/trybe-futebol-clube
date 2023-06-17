import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: { teamName: string },
  awayTeam?: { teamName: string },
}
