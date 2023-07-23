import express from "express";
import UserController from "../controllers/UserController";
import userValidation from "../middlewares/UserValidation";

export default class UserRoutes {
	private router: express.Router;

	private userController: UserController;

	constructor() {
		this.router = express.Router();
		this.userController = new UserController();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.get("/", this.userController.getAll);
		this.router.get("/:id", this.userController.getOne);
		this.router.post("/", userValidation.validators, userValidation.validationHandler, this.userController.add);
		this.router.put(
			"/:id",
			userValidation.validators,
			userValidation.validationHandler,
			this.userController.update
		);
		this.router.delete("/:id", this.userController.remove);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
