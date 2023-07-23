import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    @Index({unique: true})
	courseId: string;

	@Column()
	courseName: string;
}
