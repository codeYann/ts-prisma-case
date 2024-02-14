import { User, PrismaClient, Prisma } from "@prisma/client";

export default class UserModel {
	private static prisma = new PrismaClient();

	async findAll(): Promise<User[]> {
		try {
			const users = await UserModel.prisma.user.findMany();
			return users;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while fetching users");
		}
	}

	async findOne(email: string): Promise<User | null> {
		try {
			const user = await UserModel.prisma.user.findUnique({
				where: {
					email,
				},
				include: {
					posts: true,
				},
			});
			return user;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while fetching user");
		}
	}

	async create(user: User): Promise<User> {
		try {
			const newUser = await UserModel.prisma.user.create({
				data: user,
			});
			return newUser;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while creating user");
		}
	}

	async update(email: string, user: Partial<User>): Promise<User> {
		try {
			const updatedUser = await UserModel.prisma.user.update({
				where: {
					email,
				},
				data: user,
			});
			return updatedUser;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while updating user");
		}
	}

	async delete(email: string): Promise<User> {
		try {
			const deletedUser = await UserModel.prisma.user.delete({
				where: {
					email,
				},
			});
			return deletedUser;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while deleting user");
		}
	}
}
