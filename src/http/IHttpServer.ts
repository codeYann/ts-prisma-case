import { NextFunction, Request, Response } from "express";

type Method = "get" | "post" | "put" | "delete";
type Middleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<unknown>;

export default interface IHttpServer {
	on: (
		method: Method,
		path: string,
		middlewares: Middleware[],
		callback: (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<any>,
	) => void;
	listen: (port: number, callback: () => void) => void;
}
