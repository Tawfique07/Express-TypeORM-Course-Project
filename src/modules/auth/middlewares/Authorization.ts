import { NextFunction, Response } from "express";

import createHttpError from "http-errors";

export default class Authorization {
	checkAdmin(req: any, res: Response, next: NextFunction) {
		const { role } = req.user;
		if (role === "admin") {
			next();
			return;
		}

		next(createHttpError(403, "You are not allowed."));
	}
}
