import express from "express";
import AuthController from "../controllers/AuthController";
import userValidation from "../middlewares/UserValidation";
import Auth from "../utils/Auth";

export default class AuthRoutes {
	private router: express.Router;

	private authController: AuthController;
	private auth: Auth;

	constructor() {
		this.router = express.Router();
		this.authController = new AuthController();
		this.auth = new Auth();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router.post(
			"/login",
			userValidation.validators,
			userValidation.validationHandler,
			this.authController.loginUser
		);
		this.router.post(
			"/forget-password",
			userValidation.validators,
			userValidation.validationHandler,
			this.authController.forgetPassword
		);
		this.router.post(
			"/forget-password/:otp",
			userValidation.validators,
			userValidation.validationHandler,
			this.authController.checkOtp
		);
		this.router.post(
			"/reset-password",
			this.auth.authenticate(),
			userValidation.validators,
			userValidation.validationHandler,
			this.authController.resetPassword
		);
	}

	public getRouter(): express.Router {
		return this.router;
	}
}
