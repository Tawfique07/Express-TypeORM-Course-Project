import { Application } from "express";
import AuthRoutes from "./modules/auth/routes/AuthRoutes";
import CourseRoutes from "./modules/auth/routes/CourseRoutes";
import UserRoutes from "./modules/auth/routes/UserRoutes";
import ErrorHandler from "./modules/common/middlewares/ErrorHandler";

export default class Routes {
	private courseRoutes: CourseRoutes;
	private userRoutes: UserRoutes;
	private authRoutes: AuthRoutes;
	private errorHandler: ErrorHandler;

	constructor() {
		this.courseRoutes = new CourseRoutes();
		this.userRoutes = new UserRoutes();
		this.errorHandler = new ErrorHandler();
		this.authRoutes = new AuthRoutes();
	}

	init(app: Application): void {
		app.use("/api/users", this.userRoutes.getRouter());
		app.use("/api/courses", this.courseRoutes.getRouter());
		app.use("/api/auth", this.authRoutes.getRouter());

		app.use(this.errorHandler.notFoundHandler);
		app.use(this.errorHandler.defaultErrorHandler);
	}
}
