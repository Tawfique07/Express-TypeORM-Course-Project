import { Request, Response, NextFunction } from "express";
import courseService from "../services/CourseService";

export default class CourseController {
    async getAllCourses(req: Request, res: Response, next: NextFunction){
        try {
            const courses = await courseService.getAllCourses();
            res.status(200).json(courses);
        } catch(error){
            next(error);
        }
    }

    async add(req: Request, res: Response, next: NextFunction){
        const { courseId, courseName } = req.body;
        try {
            const course = await courseService.addNewCourse(courseId, courseName);
            res.status(200).json(course);
        } catch(error){
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction){
        try {
            const { courseId } = req.params;
            const course = await courseService.removeCourse(courseId);
            res.status(200).json(course);
        } catch(error){
            next(error);
        }
    }
}


