import { Request, Response, NextFunction } from "express";
import IHttpServer from "../http/IHttpServer";
import { PrismaClient } from "@prisma/client";

export default class UsersController {
	private static prisma = new PrismaClient();

	constructor(server: IHttpServer) {
		server.on("get", "/users", [], this.getUsers);
		server.on("get", "/users/admin", [], this.getAdmins);
		server.on("post", "/users", [], this.storeUser);
		server.on("delete", "/users/:email", [], this.deleteUser);
	}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await UsersController.prisma.user.findMany({
				include: {
					posts: true,
				},
			});
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	async getAdmins(req: Request, res: Response, next: NextFunction) {
		try {
			const admins = await UsersController.prisma.user.findMany({
				where: {
					profile: "ADMIN",
				},
			});
			res.status(200).json(admins);
		} catch (error) {
			next(error);
		}
	}

	async storeUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await UsersController.prisma.user.create({
				data: req.body,
			});
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.params;
			const user = await UsersController.prisma.user.delete({
				where: {
					email,
				},
			});
			res.status(204).json(user);
		} catch (error) {
			next(error);
		}
	}
}
