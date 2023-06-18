import { ITeamsStats } from '../Interfaces/teams/ITeamStats';

// Função de comparação para ordenação
function compareTeams(a: ITeamsStats, b: ITeamsStats): number {
  if (a.totalPoints > b.totalPoints) return -1; // a vem antes de b
  if (a.totalPoints < b.totalPoints) return 1; // b vem antes de a

  // Empate em totalPoints, verificar outros critérios
  if (a.totalVictories > b.totalVictories) return -1;
  if (a.totalVictories < b.totalVictories) return 1;

  // Empate em totalVictories, verificar critério de goalsBalance
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;

  // Empate em goalsBalance, verificar critério de goalsFavor
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;

  return 0; // Empate completo
}

export default compareTeams;
