import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
// import { NewEntity } from '../Interfaces';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findById(id: IUser['id']): Promise<IUser | null> {
    const dbResult = await this.model.findByPk(id);
    if (!dbResult) return null;
    const { username, role, email, password }: IUser = dbResult;
    return { id, username, role, email, password };
  }

  async findAll(): Promise<IUser[]> {
    const dbResult = await this.model.findAll();
    return dbResult.map(
      ({ id, username, role, email, password }) => ({ id, username, role, email, password }),
    );
  }
}
