import express from "express";
import AuthController from "../controllers/AuthController";

export default class AuthRoutes {
	private router: express.Router;

	private authController: AuthController;

	constructor() {
		this.router = express.Router();
		this.authController = new AuthController();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.post("/login", this.authController.loginUser);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
