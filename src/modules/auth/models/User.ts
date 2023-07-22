import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
	ADMIN = "admin",
	EDITOR = "editor",
	CLIENT = "client",
}

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.CLIENT,
	})
	role: UserRole;
}
