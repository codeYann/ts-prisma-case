import { Prisma, User } from "@prisma/client";
import UserModel from "../model/Users";
import IUserRepository from "./IUser";

export default class UserRepository<T extends User>
	implements IUserRepository<T>
{
	constructor(readonly model: UserModel) {
		this.model = model;
	}

	async getUsers(): Promise<T[]> {
		try {
			const users = await this.model.findAll();
			return users as unknown as T[];
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while fetching users");
		}
	}

	async storeUser(user: T): Promise<T> {
		try {
			const newUser = await this.model.create(user);
			return newUser as unknown as T;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while creating user");
		}
	}

	async updateUser(id: string, user: T): Promise<T> {
		try {
			const updatedUser = await this.model.update(id, user);
			return updatedUser as unknown as T;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while updating user");
		}
	}

	async deleteUser(id: string): Promise<T> {
		try {
			const deletedUser = await this.model.delete(id);
			return deletedUser as unknown as T;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while deleting user");
		}
	}
}
