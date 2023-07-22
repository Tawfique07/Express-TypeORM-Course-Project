import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";

export default class ErrorHandler {
	notFoundHandler(req: Request, res: Response, next: NextFunction) {
		next(createError(404, "Your requested content was not found!"));
	}

	defaultErrorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
		res.status(err.status || 500).json(err);
	}
}
