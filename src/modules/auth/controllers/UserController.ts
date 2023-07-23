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

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await userService.getUser(req.params.id);
			res.status(200).json({
				user,
			});
		} catch (error) {
			next(error);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		try {
			const user = await userService.registerUser(email, password);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async remove(req: Request, res: Response, next: NextFunction) {
		const { id: userID } = req.params;
		try {
			const result = userService.removeUser(userID);
			res.status(200).json({
				message: "User Removed Successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { password } = req.body;

		try {
			const user = userService.updateUser(req.params.id, password);
			res.status(200).json({
				message: "User updated successfully",
				user,
			});
		} catch (error) {
			next(error);
		}
	}
}
