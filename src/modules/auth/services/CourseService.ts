import createError from "http-errors";

import { AppDataSource } from "../../../data-source";
import { Course } from "../models/Course";

class CourseService {
	private courseRepository = AppDataSource.getRepository(Course);

	async getAllCourses() {
		try {
			const courses = await this.courseRepository.find();
			return courses;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async addNewCourse(courseId: string, courseName: string) {
		const course = Object.assign(new Course(), { courseId, courseName });
		try {
			let existCourse = await this.courseRepository.findOneBy({ courseId });
			if (existCourse) {
				throw createError(406, "Course already exist!");
			}
			const result = await this.courseRepository.save(course);
			return result;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async removeCourse(courseId: string) {
		try {
			let courseToRemove = await this.courseRepository.findOneBy({ courseId });
			if (!courseToRemove) {
				throw createError(400, "Course not found!");
			}
			const result = await this.courseRepository.remove(courseToRemove);
			return result;
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}

	async updateCourse(courseId: string, courseName: string) {
		try {
			let course = await this.courseRepository.findOneBy({ courseId });
			if (course) {
				course.courseName = courseName;
				course = await this.courseRepository.save(course);
				return course;
			}
			throw createError(406, "Course does not Exist");
		} catch (error) {
			throw createError(error.status || 500, error.message || "Internal server error");
		}
	}
}

export default new CourseService();
