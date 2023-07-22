import { Application } from "express";
import UserRoutes from "./modules/auth/routes/UserRoutes";
import ErrorHandler from "./modules/common/middlewares/ErrorHandler";

export default class Routes {
	private userRoutes: UserRoutes;
	private errorHandler: ErrorHandler;

	constructor() {
		this.userRoutes = new UserRoutes();
		this.errorHandler = new ErrorHandler();
	}

	init(app: Application): void {
		app.use("/users", this.userRoutes.getRouter());
		app.use(this.errorHandler.notFoundHandler);
		app.use(this.errorHandler.defaultErrorHandler);
	}
}
