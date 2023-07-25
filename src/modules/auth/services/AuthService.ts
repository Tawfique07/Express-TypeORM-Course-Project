import createError from "http-errors";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { AppDataSource } from "../../../data-source";
import { User } from "../models/User";

export class AuthService {
	private userRepository = AppDataSource.getRepository(User);
	private JWT_SECRET: string;

	constructor() {
		this.JWT_SECRET = process.env.JWT_SECRET;
	}

	async getUser(email: string): Promise<User> {
		try {
			const user: User = await this.userRepository.findOneBy({ email });

			if (user) {
				return user;
			}
			throw createError(404, "User not found");
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	getToken(user: User, expiry: string): string {
		const token =
			"Bearer " +
			jwt.sign(
				{
					id: user.id,
					email: user.email,
					role: user.role,
				},
				this.JWT_SECRET,
				{ expiresIn: expiry }
			);

		return token;
	}

	async getOtpToken(user: User) {
		const otp = otpGenerator.generate(8, { lowerCaseAlphabets: false, specialChars: false });
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				role: user.role,
			},
			otp,
			{
				expiresIn: "10m",
			}
		);

		user.pass_token = token;
		try {
			await this.userRepository.save(user);
			return otp;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	verifyOtp(user: User, otp: string) {
		try {
			jwt.verify(user.pass_token, otp);
		} catch (error) {
			throw createError(406, "Invalid OTP");
		}
	}
}

export default new AuthService();
