import { NextFunction, Request, Response } from "express";
import userService from "../services/UserService";

export default class UserController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getAllUsers();
			res.status(200).json({
				users,
			});
		} catch (error) {
			next(error);
		}
	}
}
