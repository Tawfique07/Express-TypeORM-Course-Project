import express from "express";
import UserController from "../controllers/UserController";
import Authorization from "../middlewares/Authorization";
import userValidation from "../middlewares/UserValidation";
import Auth from "../utils/Auth";

export default class UserRoutes {
	private router: express.Router;

	private userController: UserController;
	private auth: Auth;
	private authorization: Authorization;

	constructor() {
		this.router = express.Router();
		this.userController = new UserController();
		this.auth = new Auth();
		this.authorization = new Authorization();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.get("/", this.auth.authenticate(), this.authorization.checkAdmin, this.userController.getAll);
		this.router.get("/:id", this.auth.authenticate(), this.authorization.checkAdmin, this.userController.getOne);
		this.router.post("/", userValidation.validators, userValidation.validationHandler, this.userController.add);
		this.router.put(
			"/:id",
			this.auth.authenticate(),
			userValidation.validators,
			userValidation.validationHandler,
			this.userController.update
		);
		this.router.delete("/:id", this.auth.authenticate(), this.authorization.checkAdmin, this.userController.remove);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
