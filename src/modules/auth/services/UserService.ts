import createError from "http-errors";
import { AppDataSource } from "../../../data-source";
import { User } from "../models/User";

export default class UserService {
	private userRepository = AppDataSource.getRepository(User);

	async getAllUsers(): Promise<User[]> {
		try {
			const users: User[] = await this.userRepository.find();

			return users;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}
}
