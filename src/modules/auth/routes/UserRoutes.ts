import express from "express";
import UserController from "../controllers/UserController";

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
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
