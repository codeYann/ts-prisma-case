export default interface IUserRepository<T> {
	getUsers(): Promise<T[]>;
	storeUser(user: T): Promise<T>;
	updateUser(id: string, user: T): Promise<T>;
	deleteUser(id: string): Promise<T>;
}
