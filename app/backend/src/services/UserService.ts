import * as bcrypt from 'bcryptjs';
import jwtUtils from '../utils/jwtUtils';
import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ID, LoginCredentials } from '../Interfaces';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  async getUserById(id: ID): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    return { status: 'SUCCESSFUL', data: user };
  }

  async login(credentials: LoginCredentials): Promise<ServiceResponse<{ token: string }>> {
    const { email, password } = credentials;
    const users = await this.userModel.findAll();
    const user = users.find((item) => item.email === email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwtUtils.sign({ email, userId: Number(user.id) });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  async getUserRole(id: ID) {
    const { role } = await this.userModel.findById(id) as IUser;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
