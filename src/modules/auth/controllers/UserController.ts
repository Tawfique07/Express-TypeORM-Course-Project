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

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await userService.getUser(req.params.id);
			res.status(200).json({
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;

		try {
			const user = await userService.registerUser(email, password);
			res.status(200).json({
				message: "User successfully registered",
				user: {
					id: user.id,
					email: user.email,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async remove(req: Request, res: Response, next: NextFunction) {
		const { id: userID } = req.params;
		try {
			const result = await userService.removeUser(userID);
			res.status(200).json({
				message: "User Removed Successfully",
				user: {
					id: result.id,
					email: result.email,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { password, old_password } = req.body;

		try {
			let user = await userService.getUser(req.params.id);
			if (user.password !== old_password) {
				res.status(406).json({
					error: {
						msg: "Invalid password",
					},
				});
				return;
			}
			user = await userService.updateUser(req.params.id, password);
			res.status(200).json({
				message: "User updated successfully",
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
