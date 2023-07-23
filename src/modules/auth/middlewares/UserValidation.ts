import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

class UserValidation {
	validators = [
		check("email").optional().trim().isEmail().withMessage("Invalid email address."),
		check("password")
			.isStrongPassword()
			.withMessage(
				"Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
			),
	];

	validationHandler(req: Request, res: Response, next: NextFunction) {
		const errors = validationResult(req);
		const mappedErrors = errors.mapped();
		if (Object.keys(mappedErrors).length === 0) {
			next();
		} else {
			// response the errors
			res.status(400).json({
				errors: mappedErrors,
			});
		}
	}
}

export default new UserValidation();
