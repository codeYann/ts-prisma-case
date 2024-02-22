import { Request, Response, NextFunction } from "express";
import IHttpServer from "../http/IHttpServer";
import UserModel from "../model/Users";
import UserRepository from "../repository/User";
import UsersService from "../service/Users";

export default class UsersController {
	private readonly model = new UserModel();
	private readonly repository = new UserRepository(this.model);
	private readonly service = new UsersService(this.repository);

	constructor(server: IHttpServer) {
		server.on("get", "/users", [], this.getUsers.bind(this));
		server.on("post", "/users", [], this.storeUser.bind(this));
		server.on("put", "/users/:email", [], this.updateUser.bind(this));
		server.on("delete", "/users/:email", [], this.deleteUser.bind(this));
	}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.service.getUsers();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	async storeUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.service.storeUser(req.body);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.params;
			const user = await this.service.updateUser(
				email as string,
				req.body,
			);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.params;
			const user = await this.service.deleteUser(email as string);
			res.status(204).json(user);
		} catch (error) {
			next(error);
		}
	}
}
