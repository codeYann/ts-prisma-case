import IPostRepository from "../repository/IPosts";

export default class PostsService<T> {
	constructor(private readonly repository: IPostRepository<T>) {
		this.repository = repository;
	}

	async getPosts(): Promise<T[]> {
		try {
			const posts = await this.repository.getPosts();
			return posts;
		} catch (error) {
			throw error;
		}
	}

	async getPostsFromUser(uuid: string): Promise<Partial<T>[]> {
		try {
			const posts = await this.repository.getPostsFromUser(uuid);
			return posts;
		} catch (error) {
			throw error;
		}
	}

	async storePosts(post: T): Promise<T> {
		try {
			const newPost = await this.repository.storePost(post);
			return newPost;
		} catch (error) {
			throw error;
		}
	}

	async updatePost(uuid: string, post: Partial<T>): Promise<T> {
		try {
			const result = await this.repository.updatePost(uuid, post);
			return result;
		} catch (error) {
			throw error;
		}
	}

	async deletePost(uuid: string): Promise<T> {
		try {
			const result = await this.repository.deletePost(uuid);
			return result;
		} catch (error) {
			throw error;
		}
	}
}
