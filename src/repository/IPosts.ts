export default interface IPostRepository<T> {
	getPosts(): Promise<T[]>;
	storePost(post: T): Promise<T>;
	updatePost(uuid: string, post: Partial<T>): Promise<T>;
	deletePost(uuid: string): Promise<T>;
}
