import { NextFunction, Request, Response } from "express";
import authService from "../services/AuthService";
import userService from "../services/UserService";
import mailSender from "../utils/MailSender";

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
				const token = authService.getToken(user, "1d");

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

	async forgetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.getUser(req.body.email);

			if (user) {
				const otp = await authService.getOtpToken(user);
				await mailSender.send(user.email, otp);

				res.status(201).json({
					message: "You should receive an Email whit OTP.",
				});
				return;
			}

			res.status(404).json({
				error: {
					msg: "This email is not registered!",
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async checkOtp(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.getUser(req.body.email);

			if (user) {
				authService.verifyOtp(user, req.params.otp);

				const token = authService.getToken(user, "10m");

				res.status(200).json({
					message: "OTP Verified",
					token,
					user: {
						id: user.id,
						email: user.email,
					},
				});

				return;
			}

			res.status(404).json({
				error: {
					msg: "This email is not registered!",
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async resetPassword(req: any, res: Response, next: NextFunction) {
		try {
			const user = await userService.updateUser(req.user.id, req.body.password);
			res.status(202).json({
				message: "Your password have been reset",
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
