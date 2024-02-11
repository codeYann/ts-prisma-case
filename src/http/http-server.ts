import express, { Request, Response, NextFunction } from "express";
import IHttpServer from "./IHttpServer";

type Middlewares = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<unknown>;

export default class HttpServer implements IHttpServer {
	private app: any;

	constructor() {
		this.app = express();
		this.app.use(express.json());
	}

	on(
		method: string,
		path: string,
		middlewares: Middlewares[],
		callback: (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<unknown>,
	): void {
		this.app[method](
			path,
			middlewares,
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					await callback(req, res, next);
				} catch (error) {
					next(error);
				}
			},
		);
	}

	listen(port: number, callback: () => void): void {
		this.app.listen(port, callback);
	}

	close() {
		this.app.close();
	}
}
