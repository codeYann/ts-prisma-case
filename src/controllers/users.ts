import { Request, Response, NextFunction } from "express";
import IHttpServer from "../http/IHttpServer";
import { PrismaClient } from "@prisma/client/extension";

export default class UsersController {
	private static prisma = new PrismaClient();
	constructor(server: IHttpServer) {
		server.on("get", "/users", [], this.getUsers);
	}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UsersController.prisma.user.findMany();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}
}
