import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

class CourseValidation {
	validators = [
		check("courseName")
			.optional()
			.isLength({ min: 1 })
			.withMessage("Course name is required")
			.isLength({ max: 50 })
			.withMessage("Invalid Course name.")
			.isAlpha("en-US", { ignore: " -" })
			.withMessage("Course name must not contain anything other than alphabet")
			.trim(),
		check("courseId")
			.optional()
			.trim()
			.isLength({ min: 1 })
			.withMessage("Course Id is required.")
			.isLength({ max: 10 })
			.withMessage("Invalid Course Id")
			.toUpperCase(),
	];

	validationHandler(req: Request, res: Response, next: NextFunction) {
		const errors = validationResult(req);
		const mappedErrors = errors.mapped();
		if (Object.keys(mappedErrors).length === 0) {
			next();
		} else {
			// response the errors
			res.status(500).json({
				errors: mappedErrors,
			});
		}
	}
}

export default new CourseValidation();
