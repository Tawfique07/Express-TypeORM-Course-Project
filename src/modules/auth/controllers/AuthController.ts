import { NextFunction, Request, Response } from "express";
import authService from "../services/AuthService";

export default class AuthController {
	async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.getUser(req.body.email);
			if (user) {
				if (user.password !== req.body.password) {
					res.status(400).json({
						error: {
							msg: "Invalid Email or Password",
						},
					});
					return;
				}
				const token = authService.getToken(user);

				res.status(200).json({
					message: "Login Successful",
					token,
					user: {
						id: user.id,
						email: user.email,
						role: user.role,
					},
				});

				return;
			}
			res.status(404).json({
				error: {
					msg: "User not found",
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
