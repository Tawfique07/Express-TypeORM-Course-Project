import * as express from "express";
import CourseController from "../controllers/CourseController";
import Authorization from "../middlewares/Authorization";
import courseValidation from "../middlewares/CourseValidation";
import Auth from "../utils/Auth";

export default class CourseRoutes {
	private router: express.Router;
	private courseController: CourseController;
	private auth: Auth;
	private authorization: Authorization;

	constructor() {
		this.router = express.Router();
		this.courseController = new CourseController();
		this.auth = new Auth();
		this.authorization = new Authorization();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.get("/", this.auth.authenticate(), this.courseController.getAllCourses);
		this.router.post(
			"/",
			this.auth.authenticate(),
			this.authorization.checkAdmin,
			courseValidation.validators,
			courseValidation.validationHandler,
			this.courseController.add
		);
		this.router.delete(
			"/:courseId",
			this.auth.authenticate(),
			this.authorization.checkAdmin,
			this.courseController.remove
		);
		this.router.put(
			"/:courseId",
			this.auth.authenticate(),
			this.authorization.checkAdmin,
			courseValidation.validators,
			courseValidation.validationHandler,
			this.courseController.update
		);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
