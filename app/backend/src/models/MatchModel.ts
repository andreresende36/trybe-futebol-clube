import { Op } from 'sequelize';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ID } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  private sequelizeTeam = SequelizeTeam;

  async findAll(inProgress: string): Promise<SequelizeMatch[]> {
    const parser = inProgress === 'true';
    const dbResult = await this.model.findAll({
      include: [{ model: this.sequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.sequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId',
        'awayTeamGoals', 'inProgress'],
      where: {
        [Op.or]: !inProgress
          ? [{ inProgress: true }, { inProgress: false }] : [{ inProgress: parser }],
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
}