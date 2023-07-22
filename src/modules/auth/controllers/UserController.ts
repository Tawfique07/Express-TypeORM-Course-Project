import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.userService.getAllUsers();
			res.status(200).json({
				users,
			});
		} catch (error) {
			next(error);
		}
	}
}
