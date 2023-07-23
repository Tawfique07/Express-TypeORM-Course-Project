import { NextFunction, Request, Response } from "express";
import courseService from "../services/CourseService";

export default class CourseController {
	async getAllCourses(req: Request, res: Response, next: NextFunction) {
		try {
			const courses = await courseService.getAllCourses();
			res.status(200).json(courses);
		} catch (error) {
			next(error);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		const { courseId, courseName } = req.body;
		try {
			const course = await courseService.addNewCourse(courseId, courseName);
			res.status(200).json({
				message: "Course added successfully",
				course,
			});
		} catch (error) {
			next(error);
		}
	}

	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const { courseId } = req.params;
			const course = await courseService.removeCourse(courseId);
			res.status(200).json({
				message: "Course deleted successfully",
				course,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const course = courseService.updateCourse(req.params.courseId, req.body.courseName);
			res.status(200).json({
				message: "Course updated successfully",
				course,
			});
		} catch (error) {
			next(error);
		}
	}
}
