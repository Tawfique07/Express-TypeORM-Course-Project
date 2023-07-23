import createError from "http-errors";
import { AppDataSource } from "../../../data-source";
import { User } from "../models/User";

export class UserService {
	private userRepository = AppDataSource.getRepository(User);

	async getAllUsers(): Promise<User[]> {
		try {
			const users: User[] = await this.userRepository.find({
				select: {
					id: true,
					email: true,
					role: true,
				},
			});
			return users;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async getUser(userId: any) {
		try {
			const user: User = await this.userRepository.findOne({
				where: {
					id: userId,
				},
				select: {
					id: true,
					email: true,
					role: true,
				},
			});

			if (user) {
				return user;
			}
			throw createError(404, "User not found");
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async registerUser(email: string, password: string) {
		const user = Object.assign(new User(), {
			email,
			password,
		});

		try {
			const isExist = await this.userRepository.findOneBy({ email });
			if (isExist) {
				throw createError(406, "This email already Registered.");
			}
			const result = await this.userRepository.save(user);
			return result;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async removeUser(id: string) {
		try {
			const user = await this.userRepository.findOneBy({ id });
			const result = await this.userRepository.remove(user);
			return result;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async updateUser(id: string, password: string) {
		try {
			const user = await this.userRepository.findOneBy({ id });
			if (user) {
				user.password = password;
				const result: User = await this.userRepository.save(user);
				return result;
			}
			throw createError(404, "User not Found");
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}
}

export default new UserService();
