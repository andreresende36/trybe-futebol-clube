import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamsStats from '../models/TeamsStats';
import compareTeams from './compareTeams';
import { ITeamsStats } from '../Interfaces/teams/ITeamStats';

const teamStats = new TeamsStats();

const getMatchResult = (homeTeamGoals: number, awayTeamGoals: number) => {
  const result = homeTeamGoals - awayTeamGoals;
  if (result === 0) return 'draw';
  if (result > 0) return 'home';
  if (result < 0) return 'away';
};

const handleWin = (match: IMatch) => {
  teamStats.totalPoints += 3;
  teamStats.totalGames += 1;
  teamStats.totalVictories += 1;
  if (teamStats.homeOrAway === 'home') {
    teamStats.goalsFavor += match.homeTeamGoals;
    teamStats.goalsOwn += match.awayTeamGoals;
    teamStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
  }
  if (teamStats.homeOrAway === 'away') {
    teamStats.goalsFavor += match.awayTeamGoals;
    teamStats.goalsOwn += match.homeTeamGoals;
    teamStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
  }
  teamStats.efficiency = Number(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100)
    .toFixed(2));
};

const handleLoss = (match: IMatch) => {
  teamStats.totalPoints += 0;
  teamStats.totalGames += 1;
  teamStats.totalLosses += 1;
  if (teamStats.homeOrAway === 'home') {
    teamStats.goalsFavor += match.homeTeamGoals;
    teamStats.goalsOwn += match.awayTeamGoals;
    teamStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
  }
  if (teamStats.homeOrAway === 'away') {
    teamStats.goalsFavor += match.awayTeamGoals;
    teamStats.goalsOwn += match.homeTeamGoals;
    teamStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
  }
  teamStats.efficiency = Number(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100)
    .toFixed(2));
};

const handleDraw = (match: IMatch) => {
  teamStats.totalPoints += 1;
  teamStats.totalGames += 1;
  teamStats.totalDraws += 1;
  if (teamStats.homeOrAway === 'home') {
    teamStats.goalsFavor += match.homeTeamGoals;
    teamStats.goalsOwn += match.awayTeamGoals;
    teamStats.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
  }
  if (teamStats.homeOrAway === 'away') {
    teamStats.goalsFavor += match.awayTeamGoals;
    teamStats.goalsOwn += match.homeTeamGoals;
    teamStats.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
  }
  teamStats.efficiency = Number(((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100)
    .toFixed(2));
};

const calculateTeamStats = (
  finishedMatchesGroupedByTeamId: IMatch[][],
  teams: ITeam[],
): ITeamsStats[] => {
  const leaderboard = finishedMatchesGroupedByTeamId.map((matchesByTeam, index) => {
    teamStats.name = teams[index].teamName;
    matchesByTeam.forEach((match) => {
      teamStats.homeOrAway = match.homeTeamId === index + 1 ? 'home' : 'away';
      const matchResult = getMatchResult(match.homeTeamGoals, match.awayTeamGoals);
      if (matchResult === 'draw') { return handleDraw(match); }
      if (teamStats.homeOrAway === matchResult) { return handleWin(match); }
      if (teamStats.homeOrAway !== matchResult) { return handleLoss(match); }
    });
    const { homeOrAway, ...parser } = { ...teamStats };
    teamStats.clear();
    return parser;
  });
  const sortedLeaderboard = leaderboard.sort(compareTeams);
  return sortedLeaderboard;
};

export default calculateTeamStats;
