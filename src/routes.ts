import { Application } from "express";
import UserRoutes from "./modules/auth/routes/UserRoutes";
import CourseRoutes from "./modules/auth/routes/CourseRoutes";
import ErrorHandler from "./modules/common/middlewares/ErrorHandler";

export default class Routes {
	private courseRoutes: CourseRoutes;
	private userRoutes: UserRoutes;
	private errorHandler: ErrorHandler;

	constructor() {
		this.courseRoutes = new CourseRoutes();
		this.userRoutes = new UserRoutes();
		this.errorHandler = new ErrorHandler();
	}

	init(app: Application): void {
		app.use("/users", this.userRoutes.getRouter());
		app.use("/courses", this.courseRoutes.getRouter());
		
		app.use(this.errorHandler.notFoundHandler);
		app.use(this.errorHandler.defaultErrorHandler);
	}
}
