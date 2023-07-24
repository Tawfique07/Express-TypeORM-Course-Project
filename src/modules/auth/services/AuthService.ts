import createError from "http-errors";
import jwt from "jsonwebtoken";
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

	getToken(user: User): string {
		const token =
			"Bearer " +
			jwt.sign(
				{
					id: user.id,
					email: user.email,
					role: user.role,
				},
				this.JWT_SECRET,
				{ expiresIn: "1h" }
			);

		return token;
	}
}

export default new AuthService();
