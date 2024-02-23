import { Post } from "@prisma/client";
import PostsModel from "../model/Posts";
import IPostRepository from "./IPosts";

export default class PostRepository<T extends Post>
	implements IPostRepository<T>
{
	constructor(readonly model: PostsModel) {
		this.model = model;
	}

	async getPosts(): Promise<T[]> {
		try {
			const posts = await this.model.findAll();
			return posts as unknown as T[];
		} catch (error) {
			throw error;
		}
	}

	async getPostsFromUser(uuid: string): Promise<Partial<T>[]> {
		try {
			const posts = await this.model.findAllFromUser(uuid);
			return posts as unknown as Partial<T>[];
		} catch (error) {
			throw error;
		}
	}

	async storePost(post: T): Promise<T> {
		try {
			const newPost = await this.model.create(post);
			return newPost as T;
		} catch (error) {
			throw error;
		}
	}

	async updatePost(uuid: string, post: Partial<T>): Promise<T> {
		try {
			const updatedPost = await this.model.update(uuid, post);
			return updatedPost as T;
		} catch (error) {
			throw error;
		}
	}

	async deletePost(uuid: string): Promise<T> {
		try {
			const deletedPost = await this.model.delete(uuid);
			return deletedPost as T;
		} catch (error) {
			throw error;
		}
	}
}
