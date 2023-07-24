import dotenv from "dotenv";
import express, { Application } from "express";
import passport from "passport";
import Auth from "./modules/auth/utils/Auth";
import Routes from "./routes";

class Server {
	private app: Application;
	private routes: Routes;
	private PORT: Number;
	private auth: Auth;

	constructor() {
		dotenv.config();
		this.app = express();
		this.routes = new Routes();
		this.auth = new Auth();
		this.PORT = Number(process.env.SERVER_PORT);
		this.config();
	}

	private config() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.set("port", this.PORT);
		this.app.use(passport.initialize());
		this.auth.config();
		this.routes.init(this.app);
	}

	public start() {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Listening on port ${this.PORT}`);
		});
	}
}

export default new Server();
