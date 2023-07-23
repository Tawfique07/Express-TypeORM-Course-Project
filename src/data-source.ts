import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./modules/auth/models/Course";
import { User } from "./modules/auth/models/User";

dotenv.config();

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [User, Course],
	migrations: [],
	subscribers: [],
});
