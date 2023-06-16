import { Request, Response } from 'express';
import UserService from '../services/UserService';
import httpStatusMapper from '../utils/httpStatusMapper';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async getAllUsers(_req: Request, res: Response) {
    const { status, data } = await this.userService.getAllUsers();
    res.status(httpStatusMapper(status)).json(data);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.userService.getUserById(Number(id));
    res.status(httpStatusMapper(status)).json(data);
  }

  async login(req: Request, res: Response) {
    const { status, data } = await this.userService.login(req.body);
    res.status(httpStatusMapper(status)).json(data);
  }

  async getUserRole(req: Request, res: Response) {
    const { status, data } = await this.userService.getUserRole(req.body.payload.userId);
    return res.status(httpStatusMapper(status)).json(data);
  }
}
