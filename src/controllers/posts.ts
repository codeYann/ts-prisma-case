import { Request, Response, NextFunction } from "express";
import IHttpServer from "../http/IHttpServer";
import PostsModel from "../model/Posts";
import PostRepository from "../repository/Posts";
import PostsService from "../service/Posts";

export default class PostsController {
	private readonly model = new PostsModel();
	private readonly repository = new PostRepository(this.model);
	private readonly service = new PostsService(this.repository);

	constructor(server: IHttpServer) {
		server.on("get", "/posts", [], this.getPosts.bind(this));
		server.on("get", "/posts/:id", [], this.getPostsFromUser.bind(this));
		server.on("post", "/posts", [], this.storePost.bind(this));
		server.on("put", "/posts/:id", [], this.updatePost.bind(this));
		server.on("delete", "/posts/:id", [], this.deletePost.bind(this));
	}

	async getPosts(req: Request, res: Response, next: NextFunction) {
		try {
			const posts = await this.service.getPosts();
			return res.status(200).json(posts);
		} catch (error) {
			next(error);
		}
	}

	async getPostsFromUser(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (id) {
				const posts = await this.service.getPostsFromUser(id);
				return res.status(200).json(posts);
			}
		} catch (error) {
			next(error);
		}
	}

	async storePost(req: Request, res: Response, next: NextFunction) {
		try {
			const newPost = await this.service.storePosts(req.body);
			return res.status(201).json(newPost);
		} catch (error) {
			next(error);
		}
	}

	async updatePost(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (id) {
				const post = await this.service.updatePost(id, req.body);
				return res.status(200).json(post);
			}
		} catch (error) {
			next(error);
		}
	}

	async deletePost(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (id) {
				const post = await this.service.deletePost(id);
				return res.status(200).json(post);
			}
		} catch (error) {
			next(error);
		}
	}
}
