import { Post, Prisma, PrismaClient } from "prisma/prisma-client";

export default class PostsModel {
	private static prisma = new PrismaClient();

	async findAll(): Promise<Post[]> {
		try {
			const posts = await PostsModel.prisma.post.findMany({});

			return posts;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw new Error("An error occurred while fetching posts");
		}
	}

	async findAllFromUser(uuid: string): Promise<Partial<Post>[]> {
		try {
			const posts = await PostsModel.prisma.post.findMany({
				select: {
					title: true,
					content: true,
					published: true,
					createdAt: true,
				},
				where: {
					authorId: uuid,
				},
			});
			return posts;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw error;
		}
	}

	async findOne(id: string): Promise<Post> {
		try {
			const post = await PostsModel.prisma.post.findUnique({
				where: {
					id,
				},
			});

			if (!post) {
				throw new Error(`Post ${id} not found`);
			}

			return post;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw error;
		}
	}

	async create(post: Post): Promise<Post> {
		try {
			const newPost = await PostsModel.prisma.post.create({
				data: post,
			});

			return newPost;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw error;
		}
	}

	async update(uuid: string, post: Partial<Post>): Promise<Post> {
		try {
			const updatedPost = await PostsModel.prisma.post.update({
				where: {
					id: uuid,
				},
				data: post,
			});

			return updatedPost;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}
			throw error;
		}
	}

	async delete(uuid: string): Promise<Post> {
		try {
			const deletedPost = await PostsModel.prisma.post.delete({
				where: {
					id: uuid,
				},
			});

			return deletedPost;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error(error.message);
			}

			throw error;
		}
	}
}
