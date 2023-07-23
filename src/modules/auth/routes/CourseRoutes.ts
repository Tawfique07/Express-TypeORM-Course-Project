import * as express from "express";
import CourseController from "../controllers/CourseController";
import courseValidation from "../middlewares/CourseValidation";

export default class CourseRoutes {
	private router: express.Router;
	private courseController: CourseController;

	constructor() {
		this.router = express.Router();
		this.courseController = new CourseController();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.get("/", this.courseController.getAllCourses);
		this.router.post(
			"/",
			courseValidation.validators,
			courseValidation.validationHandler,
			this.courseController.add
		);
		this.router.delete("/:courseId", this.courseController.remove);
		this.router.put(
			"/:courseId",
			courseValidation.validators,
			courseValidation.validationHandler,
			this.courseController.update
		);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
