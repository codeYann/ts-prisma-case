import IUserRepository from "../repository/IUser";

export default class UsersService<T> {
	constructor(private readonly repository: IUserRepository<T>) {
		this.repository = repository;
	}

	async getUsers(): Promise<T[]> {
		try {
			const users = await this.repository.getUsers();
			return users;
		} catch (error) {
			throw error;
		}
	}

	async storeUser(user: T): Promise<T> {
		try {
			const newUser = await this.repository.storeUser(user);
			return newUser;
		} catch (error) {
			throw error;
		}
	}

	async updateUser(id: string, user: T): Promise<T> {
		try {
			const updatedUser = await this.repository.updateUser(id, user);
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(id: string): Promise<T> {
		try {
			const deletedUser = await this.repository.deleteUser(id);
			return deletedUser;
		} catch (error) {
			throw error;
		}
	}
}
