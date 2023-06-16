import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbResult = await this.model.findByPk(id);
    if (!dbResult) return null;
    const { teamName }: ITeam = dbResult;
    return { id, teamName };
  }

  async findAll(): Promise<ITeam[]> {
    const dbResult = await this.model.findAll();
    return dbResult.map(({ id, teamName }) => ({ id, teamName }));
  }
}
