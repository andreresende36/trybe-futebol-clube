import { Op } from 'sequelize';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ID, NewEntity } from '../Interfaces';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  private sequelizeTeam = SequelizeTeam;

  async findAll(inProgress: string): Promise<SequelizeMatch[]> {
    const dbResult = await this.model.findAll({
      include: [{ model: this.sequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.sequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress'],
      where: {
        [Op.or]: !inProgress
          ? [{ inProgress: true }, { inProgress: false }]
          : [{ inProgress: inProgress === 'true' }],
      },
    });
    return dbResult;
  }

  async findById(id: ID): Promise<SequelizeMatch | null> {
    const dbResult = await this.model.findByPk(id, {
      include: [{ model: this.sequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.sequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress'],
    });
    if (!dbResult) return null;
    return dbResult;
  }

  async findFinishedMatchesByTeamId(
    teamId: ID,
  ): Promise<IMatch[]> {
    const dbResult = await this.model.findAll({
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress'],
      where: {
        [Op.or]: [
          { inProgress: false, homeTeamId: teamId }, { inProgress: false, awayTeamId: teamId },
        ],
      }
      ,
    });
    return dbResult.map(
      ({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
        { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
      ),
    );
  }

  async findFinishedMatchesByTeamIdAndHomeOrAway(
    teamId: ID,
    homeOrAway: string,
  ): Promise<IMatch[]> {
    const dbResult = await this.model.findAll({
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress'],
      where: {
        [Op.or]: [homeOrAway === 'home'
          ? { inProgress: false, homeTeamId: teamId }
          : { inProgress: false, awayTeamId: teamId }],
      }
      ,
    });
    return dbResult.map(
      ({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
        { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
      ),
    );
  }

  async update(id: ID, data: Partial<IMatch>): Promise<number | null> {
    const [updateResult] = await this.model.update(
      data,
      { where: { id } },
    );
    return updateResult;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const dbResult = await this.model.create(data);
    return dbResult;
  }
}
